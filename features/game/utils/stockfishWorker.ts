import { Platform } from 'react-native';

type StockfishCallback = (bestMove: string) => void;

class StockfishEngine {
  private worker: Worker | null = null;
  private isReady = false;
  private pendingCallback: StockfishCallback | null = null;
  private depth = 18;

  init() {
    if (Platform.OS !== 'web') return;

    try {
      this.worker = new Worker(
        new URL('stockfish/src/stockfish.js', import.meta.url)
      );

      this.worker.onmessage = (e: MessageEvent) => {
        const line: string = e.data;

        if (line === 'uciok') {
          this.worker?.postMessage('isready');
        }

        if (line === 'readyok') {
          this.isReady = true;
        }

        if (line.startsWith('bestmove')) {
          const parts = line.split(' ');
          const move = parts[1];
          if (move && move !== '(none)' && this.pendingCallback) {
            this.pendingCallback(move);
            this.pendingCallback = null;
          }
        }
      };

      this.worker.onerror = (e) => {
        console.log('Stockfish worker error:', e);
      };

      this.worker.postMessage('uci');
    } catch (error) {
      console.log('Stockfish init error:', error);
    }
  }

  setDepth(depth: number) {
    this.depth = depth;
  }

  getBestMove(fen: string, callback: StockfishCallback) {
    if (!this.worker || !this.isReady) {
      callback('');
      return;
    }

    this.pendingCallback = callback;
    this.worker.postMessage('ucinewgame');
    this.worker.postMessage(`position fen ${fen}`);
    this.worker.postMessage(`go depth ${this.depth}`);
  }

  terminate() {
    this.worker?.terminate();
    this.worker = null;
    this.isReady = false;
  }
}

export const stockfishEngine = new StockfishEngine();