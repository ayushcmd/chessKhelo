import { supabase } from '../../../shared/lib/supabase';
import { RealtimeChannel } from '@supabase/supabase-js';

export interface LanMovePayload {
  from: string;
  to: string;
  promotion?: string;
  fen: string;
  moveNumber: number;
  whiteTime?: number;
  blackTime?: number;
}

export interface LanGameMessage {
  type: 'join' | 'ready' | 'move' | 'resign' | 'rematch_offer' | 'rematch_accept' | 'leave';
  senderRole: 'host' | 'guest';
  payload?: any;
}

type MessageHandler = (msg: LanGameMessage) => void;
type StatusHandler = (connected: boolean, opponentPresent: boolean) => void;

class LanGameService {
  private channel: RealtimeChannel | null = null;
  private broadcastChannel: any = null;
  private roomCode: string | null = null;
  private role: 'host' | 'guest' | null = null;
  private onMessageCallback: MessageHandler | null = null;
  private onStatusCallback: StatusHandler | null = null;
  private isOpponentPresent = false;
  private heartbeatInterval: any = null;

  public connect(
    roomCode: string,
    role: 'host' | 'guest',
    onMessage: MessageHandler,
    onStatus: StatusHandler
  ) {
    this.disconnect();
    this.roomCode = roomCode;
    this.role = role;
    this.onMessageCallback = onMessage;
    this.onStatusCallback = onStatus;

    const channelName = `chess_lan_${roomCode}`;

    // 1. Setup Browser BroadcastChannel (instant zero-latency for same-device multi-tab testing)
    if (typeof BroadcastChannel !== 'undefined') {
      try {
        this.broadcastChannel = new BroadcastChannel(channelName);
        this.broadcastChannel.onmessage = (event: MessageEvent) => {
          const msg = event.data as LanGameMessage;
          if (msg && msg.senderRole !== this.role) {
            this.handleIncomingMessage(msg);
          }
        };
      } catch (err) {
        console.warn('BroadcastChannel not supported', err);
      }
    }

    // 2. Setup Supabase Realtime Channel (instant WiFi / LAN communication across different devices)
    try {
      this.channel = supabase.channel(channelName, {
        config: {
          broadcast: { self: false, ack: false },
        },
      });

      this.channel
        .on('broadcast', { event: 'game_msg' }, ({ payload }) => {
          const msg = payload as LanGameMessage;
          if (msg && msg.senderRole !== this.role) {
            this.handleIncomingMessage(msg);
          }
        })
        .subscribe((status) => {
          if (status === 'SUBSCRIBED') {
            this.onStatusCallback?.(true, this.isOpponentPresent);
            // Announce presence
            this.sendMessage({
              type: 'join',
              senderRole: role,
              payload: { role },
            });
          }
        });
    } catch (err) {
      console.warn('Supabase Realtime connect error:', err);
      this.onStatusCallback?.(true, false);
    }

    // Heartbeat every 4 seconds to announce presence
    this.heartbeatInterval = setInterval(() => {
      this.sendMessage({
        type: 'join',
        senderRole: role,
        payload: { role },
      });
    }, 4000);
  }

  private handleIncomingMessage(msg: LanGameMessage) {
    if (msg.type === 'join' || msg.type === 'ready') {
      if (!this.isOpponentPresent) {
        this.isOpponentPresent = true;
        this.onStatusCallback?.(true, true);
      }
    } else if (msg.type === 'leave') {
      this.isOpponentPresent = false;
      this.onStatusCallback?.(true, false);
    }

    this.onMessageCallback?.(msg);
  }

  public sendMessage(msg: LanGameMessage) {
    // 1. Send via local BroadcastChannel
    if (this.broadcastChannel) {
      try {
        this.broadcastChannel.postMessage(msg);
      } catch (err) {
        // ignore
      }
    }

    // 2. Send via Supabase Realtime channel
    if (this.channel) {
      try {
        this.channel.send({
          type: 'broadcast',
          event: 'game_msg',
          payload: msg,
        });
      } catch (err) {
        // ignore
      }
    }
  }

  public sendMove(payload: LanMovePayload) {
    if (!this.role) return;
    this.sendMessage({
      type: 'move',
      senderRole: this.role,
      payload,
    });
  }

  public sendResign(color: 'w' | 'b') {
    if (!this.role) return;
    this.sendMessage({
      type: 'resign',
      senderRole: this.role,
      payload: { byColor: color },
    });
  }

  public sendRematchOffer() {
    if (!this.role) return;
    this.sendMessage({
      type: 'rematch_offer',
      senderRole: this.role,
    });
  }

  public sendRematchAccept() {
    if (!this.role) return;
    this.sendMessage({
      type: 'rematch_accept',
      senderRole: this.role,
    });
  }

  public disconnect() {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }

    if (this.role) {
      this.sendMessage({
        type: 'leave',
        senderRole: this.role,
      });
    }

    if (this.channel) {
      supabase.removeChannel(this.channel);
      this.channel = null;
    }

    if (this.broadcastChannel) {
      try {
        this.broadcastChannel.close();
      } catch (err) {
        // ignore
      }
      this.broadcastChannel = null;
    }

    this.isOpponentPresent = false;
    this.roomCode = null;
    this.role = null;
    this.onMessageCallback = null;
    this.onStatusCallback = null;
  }
}

export const lanGameService = new LanGameService();
