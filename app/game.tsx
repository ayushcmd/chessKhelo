import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Dimensions,
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
import { LucideIcon } from '../shared/components/LucideIcon';
import { colors } from '../shared/theme/colors';
import { spacing } from '../shared/theme/spacing';
import { typography } from '../shared/theme/typography';
import { APP_CONFIG } from '../shared/constants/appConfig';

const { width } = Dimensions.get('window');
const isDesktop = width > 768;

export default function GameScreen() {
  const { mode, difficulty } = useLocalSearchParams<{
    mode: GameMode;
    difficulty: string;
  }>();

  const router = useRouter();

  const selectedDifficulty =
    (difficulty as any) ?? APP_CONFIG.game.defaultDifficulty;
  const gameMode: GameMode = mode === 'friend' ? 'friend' : 'ai';

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
    resetGame,
    currentTurn,
  } = useChessEngine(gameMode, selectedDifficulty);

  const timer = useTimer(APP_CONFIG.game.defaultTimer);
  const captured = useCapturedPieces(chess);
  const moveHistory = useMoveHistory(chess);

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
    navigateToGameOver('resign', currentTurn === 'w' ? 'b' : 'w');
  };

  const handleUndo = () => {
    chess.undo();
    if (gameMode === 'ai') chess.undo();
  };

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
          <Text style={styles.headerTitle}>
            {gameMode === 'ai'
              ? `vs AI · ${selectedDifficulty}`
              : 'vs Friend'}
          </Text>
          {isAIThinking && (
            <Text style={styles.thinkingText}>thinking...</Text>
          )}
        </View>

        {isDesktop ? (
          <View style={styles.desktopLayout}>
            <View style={styles.desktopBoard}>
              <PlayerPanel
                name={gameMode === 'ai' ? 'Stockfish AI' : 'Player 2'}
                isAI={gameMode === 'ai'}
                isActive={currentTurn === 'b'}
                formattedTime={timer.formattedBlackTime}
                capturedPieces={captured.blackCaptured}
                advantage={captured.blackAdvantage}
              />
              <CapturedPieces
                pieces={captured.blackCaptured}
                advantage={captured.blackAdvantage}
              />
              <ChessBoard
                chess={chess}
                selectedSquare={selectedSquare}
                legalMoves={legalMoves}
                lastMove={lastMove}
                checkedKing={checkedKing}
                onSquarePress={handleSquarePress}
              />
              <CapturedPieces
                pieces={captured.whiteCaptured}
                advantage={captured.whiteAdvantage}
              />
              <PlayerPanel
                name="You"
                isActive={currentTurn === 'w'}
                formattedTime={timer.formattedWhiteTime}
                capturedPieces={captured.whiteCaptured}
                advantage={captured.whiteAdvantage}
              />
            </View>

            <View style={styles.desktopControls}>
              <MoveHistoryDrawer
                history={moveHistory.history}
                totalMoves={moveHistory.totalMoves}
              />
              <View style={styles.controlButtons}>
                <TouchableOpacity style={styles.controlBtn} onPress={handleUndo}>
                  <LucideIcon name="RotateCcw" size={16} color={colors.text.secondary} />
                  <Text style={styles.controlLabel}>Undo</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.controlBtn} onPress={resetGame}>
                  <LucideIcon name="RefreshCw" size={16} color={colors.text.secondary} />
                  <Text style={styles.controlLabel}>New Game</Text>
                </TouchableOpacity>
                <ResignButton onResign={handleResign} />
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.mobileLayout}>
            <PlayerPanel
              name={gameMode === 'ai' ? 'Stockfish AI' : 'Player 2'}
              isAI={gameMode === 'ai'}
              isActive={currentTurn === 'b'}
              formattedTime={timer.formattedBlackTime}
              capturedPieces={captured.blackCaptured}
              advantage={captured.blackAdvantage}
            />
            <CapturedPieces
              pieces={captured.blackCaptured}
              advantage={captured.blackAdvantage}
            />
            <ChessBoard
              chess={chess}
              selectedSquare={selectedSquare}
              legalMoves={legalMoves}
              lastMove={lastMove}
              checkedKing={checkedKing}
              onSquarePress={handleSquarePress}
            />
            <CapturedPieces
              pieces={captured.whiteCaptured}
              advantage={captured.whiteAdvantage}
            />
            <PlayerPanel
              name="You"
              isActive={currentTurn === 'w'}
              formattedTime={timer.formattedWhiteTime}
              capturedPieces={captured.whiteCaptured}
              advantage={captured.whiteAdvantage}
            />
            <View style={styles.controlButtons}>
              <TouchableOpacity style={styles.controlBtn} onPress={handleUndo}>
                <LucideIcon name="RotateCcw" size={15} color={colors.text.secondary} />
                <Text style={styles.controlLabel}>Undo</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.controlBtn} onPress={resetGame}>
                <LucideIcon name="RefreshCw" size={15} color={colors.text.secondary} />
                <Text style={styles.controlLabel}>New Game</Text>
              </TouchableOpacity>
              <ResignButton onResign={handleResign} />
            </View>
          </View>
        )}

        {/* Game Over Banner */}
        {isGameOver && (
          <View style={styles.gameOverBanner}>
            <Text style={styles.gameOverText}>
              {gameResult === 'checkmate'
                ? winner === 'w'
                  ? 'You Win!'
                  : 'AI Wins!'
                : 'Draw!'}
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
                  navigateToGameOver(
                    gameResult ?? 'draw',
                    winner ?? ''
                  )
                }
                style={styles.statsBtn}
              >
                <Text style={styles.statsBtnText}>View Stats</Text>
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
    paddingVertical: spacing.md,
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
  headerTitle: {
    fontSize: typography.sizes.md,
    fontWeight: '600',
    color: colors.text.primary,
    flex: 1,
    textTransform: 'capitalize',
  },
  thinkingText: {
    fontSize: typography.sizes.xs,
    color: colors.green.primary,
    fontStyle: 'italic',
  },
  desktopLayout: {
    flex: 1,
    flexDirection: 'row',
    gap: spacing.xl,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  desktopBoard: {
    width: 480,
    gap: spacing.sm,
  },
  desktopControls: {
    width: 260,
    gap: spacing.md,
    marginTop: spacing.sm,
  },
  mobileLayout: {
    flex: 1,
    gap: spacing.sm,
  },
  controlButtons: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  controlBtn: {
    flex: 1,
    backgroundColor: colors.glass.light,
    borderWidth: 1,
    borderTopWidth: 1.5,
    borderColor: colors.glass.border,
    borderTopColor: colors.glass.borderTop,
    borderRadius: spacing.borderRadius.md,
    padding: spacing.sm,
    alignItems: 'center',
    gap: 4,
  },
  controlLabel: {
    fontSize: typography.sizes.xs,
    color: colors.text.secondary,
  },
  gameOverBanner: {
    position: 'absolute',
    bottom: spacing.xxl,
    left: spacing.xl,
    right: spacing.xl,
    backgroundColor: 'rgba(0,0,0,0.85)',
    borderWidth: 1,
    borderColor: colors.green.border,
    borderRadius: spacing.borderRadius.lg,
    padding: spacing.xl,
    alignItems: 'center',
    gap: spacing.md,
  },
  gameOverText: {
    fontSize: typography.sizes.xxl,
    fontWeight: '700',
    color: colors.text.primary,
  },
  gameOverButtons: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  playAgainBtn: {
    backgroundColor: colors.green.dim,
    borderWidth: 1,
    borderColor: colors.green.border,
    borderRadius: spacing.borderRadius.md,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
  },
  playAgainText: {
    fontSize: typography.sizes.md,
    fontWeight: '600',
    color: colors.green.primary,
  },
  statsBtn: {
    backgroundColor: colors.glass.light,
    borderWidth: 1,
    borderColor: colors.glass.border,
    borderRadius: spacing.borderRadius.md,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
  },
  statsBtnText: {
    fontSize: typography.sizes.md,
    color: colors.text.secondary,
    fontWeight: '500',
  },
});