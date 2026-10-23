import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Platform,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ChessBoard } from '../features/game/components/ChessBoard';
import { PlayerPanel } from '../features/game/components/PlayerPanel';
import { ResignButton } from '../features/game/components/ResignButton';
import { MoveHistoryDrawer } from '../features/game/components/MoveHistoryDrawer';
import { CapturedPieces } from '../features/game/components/CapturedPieces';
import { useChessEngine, GameMode } from '../features/game/hooks/useChessEngine';
import { useTimer } from '../features/game/hooks/useTimer';
import { useCapturedPieces } from '../features/game/hooks/useCapturedPieces';
import { useMoveHistory } from '../features/game/hooks/useMoveHistory';
import { lanGameService } from '../features/game/services/lanGameService';
import { useSound } from '../shared/hooks/useSound';
import { LucideIcon } from '../shared/components/LucideIcon';
import { colors } from '../shared/theme/colors';
import { spacing } from '../shared/theme/spacing';
import { typography } from '../shared/theme/typography';
import { useGameSettings } from '../shared/hooks/useGameSettings';

const { width } = Dimensions.get('window');
const isDesktop = width > 768;

export default function GameScreen() {
  const { mode, difficulty, room, role, side, time } = useLocalSearchParams<{
    mode: GameMode;
    difficulty?: string;
    room?: string;
    role?: 'host' | 'guest';
    side?: 'w' | 'b';
    time?: string;
  }>();

  const router = useRouter();
  const { settings } = useGameSettings();
  const { playSound } = useSound(settings.soundEnabled);

  const gameMode: GameMode = mode === 'friend' ? 'friend' : mode === 'lan' ? 'lan' : 'ai';
  const selectedDifficulty = (difficulty as any) ?? settings.difficulty;
  const myColor: 'w' | 'b' = (side as 'w' | 'b') ?? (role === 'guest' ? 'b' : 'w');

  const [lanConnected, setLanConnected] = useState(false);
  const [opponentPresent, setOpponentPresent] = useState(false);
  const [rematchOffered, setRematchOffered] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const initialTimeDuration = time ? Number(time) * 60 : settings.timerDuration;
  const timer = useTimer(initialTimeDuration);

  const {
    chess,
    selectedSquare,
    legalMoves,
    checkedKing,
    isGameOver,
    gameResult,
    winner,
    isAIThinking,
    lastMove,
    handleSquarePress,
    applyRemoteMove,
    resetGame,
    currentTurn,
  } = useChessEngine(gameMode, selectedDifficulty, {
    playerColor: myColor,
    onLocalMove: (move) => {
      if (gameMode === 'lan') {
        lanGameService.sendMove({
          from: move.from,
          to: move.to,
          promotion: move.promotion,
          fen: move.fen,
          moveNumber: moveHistory.totalMoves + 1,
        });
      }
      playSound(chess.isCheck() ? 'check' : 'move');
    },
  });

  const captured = useCapturedPieces(chess);
  const moveHistory = useMoveHistory(chess);

  // Connect to WiFi LAN Room
  useEffect(() => {
    if (gameMode !== 'lan' || !room) return;

    lanGameService.connect(
      room,
      role ?? 'host',
      (msg) => {
        if (msg.type === 'move') {
          applyRemoteMove(msg.payload);
          playSound(chess.isCheck() ? 'check' : 'move');
        } else if (msg.type === 'resign') {
          navigateToGameOver('resign', myColor);
        } else if (msg.type === 'rematch_offer') {
          setRematchOffered(true);
        } else if (msg.type === 'rematch_accept') {
          resetGame();
          setRematchOffered(false);
        }
      },
      (connected, opponentHere) => {
        setLanConnected(connected);
        setOpponentPresent(opponentHere);
      }
    );

    return () => {
      lanGameService.disconnect();
    };
  }, [gameMode, room, role]);

  // Timer controls
  useEffect(() => {
    if (chess.history().length === 1 && !timer.isRunning) {
      timer.start();
    }
  }, [chess.history().length]);

  useEffect(() => {
    if (timer.isRunning) {
      timer.switchPlayer();
    }
  }, [currentTurn]);

  useEffect(() => {
    if (isGameOver) {
      timer.pause();
      playSound('gameover');
    }
  }, [isGameOver]);

  const navigateToGameOver = (result: string, win: string) => {
    router.push({
      pathname: '/gameover',
      params: {
        gameResult: result,
        winner: win,
        totalMoves: String(moveHistory.totalMoves),
        duration: timer.formattedWhiteTime,
        capturedCount: String(captured.whiteCaptured.length),
      },
    });
  };

  const handleResign = () => {
    timer.pause();
    if (gameMode === 'lan') {
      lanGameService.sendResign(myColor);
      navigateToGameOver('resign', myColor === 'w' ? 'b' : 'w');
    } else {
      navigateToGameOver('resign', currentTurn === 'w' ? 'b' : 'w');
    }
  };

  const handleUndo = () => {
    if (gameMode === 'lan') return; // Undo disabled in network LAN game
    chess.undo();
    if (gameMode === 'ai') chess.undo();
  };

  const handleCopyLanCode = () => {
    if (room && Platform.OS === 'web' && typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(room);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const isFlipped = gameMode === 'lan' && myColor === 'b';

  const renderTopPlayer = () => {
    if (gameMode === 'ai') {
      return (
        <PlayerPanel
          name="Stockfish AI"
          isAI={true}
          isActive={currentTurn === 'b'}
          formattedTime={timer.formattedBlackTime}
          capturedPieces={captured.blackCaptured}
          advantage={captured.blackAdvantage}
        />
      );
    }

    if (gameMode === 'lan') {
      const opponentColor = myColor === 'w' ? 'b' : 'w';
      return (
        <PlayerPanel
          name={opponentPresent ? `Opponent (${opponentColor === 'w' ? 'White' : 'Black'})` : 'Waiting for Player...'}
          isAI={false}
          isActive={currentTurn === opponentColor}
          formattedTime={opponentColor === 'w' ? timer.formattedWhiteTime : timer.formattedBlackTime}
          capturedPieces={opponentColor === 'w' ? captured.whiteCaptured : captured.blackCaptured}
          advantage={opponentColor === 'w' ? captured.whiteAdvantage : captured.blackAdvantage}
        />
      );
    }

    // Friend mode
    return (
      <PlayerPanel
        name="Player 2 (Black)"
        isAI={false}
        isActive={currentTurn === 'b'}
        formattedTime={timer.formattedBlackTime}
        capturedPieces={captured.blackCaptured}
        advantage={captured.blackAdvantage}
      />
    );
  };

  const renderBottomPlayer = () => {
    if (gameMode === 'lan') {
      return (
        <PlayerPanel
          name={`You (${myColor === 'w' ? 'White' : 'Black'})`}
          isActive={currentTurn === myColor}
          formattedTime={myColor === 'w' ? timer.formattedWhiteTime : timer.formattedBlackTime}
          capturedPieces={myColor === 'w' ? captured.whiteCaptured : captured.blackCaptured}
          advantage={myColor === 'w' ? captured.whiteAdvantage : captured.blackAdvantage}
        />
      );
    }

    return (
      <PlayerPanel
        name={gameMode === 'ai' ? 'You (White)' : 'Player 1 (White)'}
        isActive={currentTurn === 'w'}
        formattedTime={timer.formattedWhiteTime}
        capturedPieces={captured.whiteCaptured}
        advantage={captured.whiteAdvantage}
      />
    );
  };

  const renderBoard = () => (
    <>
      {renderTopPlayer()}
      <CapturedPieces
        pieces={isFlipped ? captured.whiteCaptured : captured.blackCaptured}
        advantage={isFlipped ? captured.whiteAdvantage : captured.blackAdvantage}
      />
      <ChessBoard
        chess={chess}
        selectedSquare={selectedSquare}
        legalMoves={legalMoves}
        lastMove={lastMove}
        checkedKing={checkedKing}
        onSquarePress={handleSquarePress}
        flipped={isFlipped}
      />
      <CapturedPieces
        pieces={isFlipped ? captured.blackCaptured : captured.whiteCaptured}
        advantage={isFlipped ? captured.blackAdvantage : captured.whiteAdvantage}
      />
      {renderBottomPlayer()}
    </>
  );

  const renderControls = () => (
    <View style={styles.controlButtons}>
      {gameMode !== 'lan' && (
        <TouchableOpacity style={styles.controlBtn} onPress={handleUndo}>
          <LucideIcon name="RotateCcw" size={16} color={colors.text.secondary} />
          <Text style={styles.controlLabel}>Undo</Text>
        </TouchableOpacity>
      )}

      {gameMode !== 'lan' ? (
        <TouchableOpacity style={styles.controlBtn} onPress={resetGame}>
          <LucideIcon name="RefreshCw" size={16} color={colors.text.secondary} />
          <Text style={styles.controlLabel}>New Game</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.controlBtn}
          onPress={() => lanGameService.sendRematchOffer()}
        >
          <LucideIcon name="RefreshCw" size={16} color={colors.green.primary} />
          <Text style={[styles.controlLabel, { color: colors.green.primary }]}>
            Rematch
          </Text>
        </TouchableOpacity>
      )}

      <ResignButton onResign={handleResign} />
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => router.push('/home')}
          >
            <LucideIcon name="ChevronLeft" size={18} color={colors.text.secondary} />
          </TouchableOpacity>

          <View style={styles.headerInfo}>
            <Text style={styles.headerTitle}>
              {gameMode === 'ai'
                ? `vs AI · ${selectedDifficulty}`
                : gameMode === 'lan'
                ? `WiFi LAN · Room #${room}`
                : 'vs Friend (Pass & Play)'}
            </Text>

            {gameMode === 'lan' && (
              <View style={styles.lanStatusRow}>
                <View
                  style={[
                    styles.statusDot,
                    opponentPresent ? styles.dotGreen : styles.dotYellow,
                  ]}
                />
                <Text style={styles.lanStatusText}>
                  {opponentPresent
                    ? 'Connected with Opponent'
                    : 'Waiting for player on same WiFi...'}
                </Text>
                {room && (
                  <TouchableOpacity
                    style={styles.roomCopyBadge}
                    onPress={handleCopyLanCode}
                  >
                    <LucideIcon
                      name={copiedCode ? 'Check' : 'Copy'}
                      size={12}
                      color={colors.green.primary}
                    />
                    <Text style={styles.roomCopyText}>
                      {copiedCode ? 'Copied' : `Code: ${room}`}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
          </View>

          {isAIThinking && (
            <Text style={styles.thinkingText}>thinking...</Text>
          )}
        </View>

        {/* Rematch Offer Notification Banner */}
        {rematchOffered && (
          <View style={styles.rematchBanner}>
            <Text style={styles.rematchBannerText}>
              Opponent requested a rematch!
            </Text>
            <TouchableOpacity
              style={styles.acceptRematchBtn}
              onPress={() => {
                lanGameService.sendRematchAccept();
                resetGame();
                setRematchOffered(false);
              }}
            >
              <Text style={styles.acceptRematchText}>Accept Rematch</Text>
            </TouchableOpacity>
          </View>
        )}

        {isDesktop ? (
          <ScrollView
            contentContainerStyle={styles.desktopLayout}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.desktopBoard}>{renderBoard()}</View>
            <View style={styles.desktopControls}>
              <MoveHistoryDrawer
                history={moveHistory.history}
                totalMoves={moveHistory.totalMoves}
              />
              {renderControls()}
            </View>
          </ScrollView>
        ) : (
          <ScrollView
            style={styles.mobileLayout}
            contentContainerStyle={styles.mobileContent}
            showsVerticalScrollIndicator={false}
          >
            {renderBoard()}
            {renderControls()}
          </ScrollView>
        )}

        {/* Game Over Banner */}
        {isGameOver && (
          <View style={styles.gameOverBanner}>
            <Text style={styles.gameOverText}>
              {gameResult === 'checkmate'
                ? winner === myColor
                  ? 'Victory! You Win!'
                  : 'Checkmate! Opponent Wins!'
                : 'Game Drawn!'}
            </Text>
            <View style={styles.gameOverButtons}>
              <TouchableOpacity
                onPress={resetGame}
                style={styles.playAgainBtn}
              >
                <Text style={styles.playAgainText}>Play Again</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  navigateToGameOver(gameResult ?? 'draw', winner ?? '')
                }
                style={styles.statsBtn}
              >
                <Text style={styles.statsBtnText}>View Summary</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg.primary,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.sm + 4,
  },
  backBtn: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: colors.glass.light,
    borderWidth: 1,
    borderColor: colors.glass.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerInfo: {
    flex: 1,
    gap: 2,
  },
  headerTitle: {
    fontSize: typography.sizes.md,
    fontWeight: '700',
    color: colors.text.primary,
  },
  lanStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  dotGreen: {
    backgroundColor: '#70e000',
  },
  dotYellow: {
    backgroundColor: '#ffb703',
  },
  lanStatusText: {
    fontSize: typography.sizes.xs,
    color: colors.text.secondary,
  },
  roomCopyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(82,183,136,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(82,183,136,0.3)',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 1,
    marginLeft: 4,
  },
  roomCopyText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.green.primary,
  },
  thinkingText: {
    fontSize: typography.sizes.xs,
    color: colors.green.primary,
    fontStyle: 'italic',
  },
  rematchBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(82,183,136,0.15)',
    borderWidth: 1,
    borderColor: colors.green.primary,
    borderRadius: spacing.borderRadius.md,
    padding: spacing.sm,
    marginBottom: spacing.xs,
  },
  rematchBannerText: {
    fontSize: typography.sizes.xs,
    fontWeight: '600',
    color: colors.text.primary,
  },
  acceptRematchBtn: {
    backgroundColor: colors.green.primary,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 4,
  },
  acceptRematchText: {
    fontSize: typography.sizes.xs,
    fontWeight: '700',
    color: '#060f07',
  },
  desktopLayout: {
    flexDirection: 'row',
    gap: spacing.xl,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingBottom: spacing.xxl,
  },
  desktopBoard: {
    width: 480,
    gap: spacing.sm,
  },
  desktopControls: {
    width: 260,
    gap: spacing.md,
  },
  mobileLayout: {
    flex: 1,
  },
  mobileContent: {
    gap: spacing.sm,
    alignItems: 'center',
    paddingBottom: spacing.xxl,
  },
  controlButtons: {
    flexDirection: 'row',
    gap: spacing.sm,
    width: '100%',
    maxWidth: 480,
    marginTop: spacing.xs,
  },
  controlBtn: {
    flex: 1,
    backgroundColor: colors.glass.light,
    borderWidth: 1,
    borderTopWidth: 1.5,
    borderColor: colors.glass.border,
    borderTopColor: colors.glass.borderTop,
    borderRadius: spacing.borderRadius.md,
    paddingVertical: spacing.sm + 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
  },
  controlLabel: {
    fontSize: typography.sizes.xs,
    color: colors.text.secondary,
    fontWeight: '600',
  },
  gameOverBanner: {
    position: 'absolute',
    bottom: 20,
    left: spacing.md,
    right: spacing.md,
    backgroundColor: '#0c2212',
    borderWidth: 1.5,
    borderColor: colors.green.border,
    borderTopColor: colors.green.primary,
    borderRadius: spacing.borderRadius.lg,
    padding: spacing.md,
    alignItems: 'center',
    gap: spacing.sm,
    shadowColor: colors.green.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
  },
  gameOverText: {
    fontSize: typography.sizes.lg,
    fontWeight: '800',
    color: colors.text.primary,
  },
  gameOverButtons: {
    flexDirection: 'row',
    gap: spacing.sm,
    width: '100%',
  },
  playAgainBtn: {
    flex: 1,
    backgroundColor: colors.green.primary,
    paddingVertical: spacing.sm,
    borderRadius: spacing.borderRadius.sm,
    alignItems: 'center',
  },
  playAgainText: {
    fontSize: typography.sizes.sm,
    fontWeight: '700',
    color: '#060f07',
  },
  statsBtn: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    paddingVertical: spacing.sm,
    borderRadius: spacing.borderRadius.sm,
    alignItems: 'center',
  },
  statsBtnText: {
    fontSize: typography.sizes.sm,
    fontWeight: '600',
    color: colors.text.primary,
  },
});
