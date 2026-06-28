import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Chess, Square } from 'chess.js';
import { PIECE_SYMBOLS, FILES, RANKS } from '../constants/pieceConfig';
import {
  getSquareColor,
  getHighlightColor,
  getSelectedColor,
  rowColToSquare,
} from '../utils/boardHelpers';
import { GAME_CONFIG } from '../constants/gameConfig';

interface ChessBoardProps {
  chess: Chess;
  selectedSquare: Square | null;
  legalMoves: Square[];
  lastMove: { from: Square; to: Square } | null;
  checkedKing: Square | null;
  onSquarePress: (square: Square) => void;
  flipped?: boolean;
}

export const ChessBoard: React.FC<ChessBoardProps> = ({
  chess,
  selectedSquare,
  legalMoves,
  lastMove,
  checkedKing,
  onSquarePress,
  flipped = false,
}) => {
  const board = chess.board();

  const getSquareBackground = useCallback(
    (row: number, col: number): string => {
      const square = rowColToSquare(row, col);

      if (square === selectedSquare) {
        return getSelectedColor(row, col);
      }
      if (legalMoves.includes(square)) {
        return getHighlightColor(row, col);
      }
      if (
        lastMove &&
        (square === lastMove.from || square === lastMove.to)
      ) {
        return getHighlightColor(row, col);
      }
      if (square === checkedKing) {
        return 'rgba(220,50,50,0.7)';
      }
      return getSquareColor(row, col);
    },
    [selectedSquare, legalMoves, lastMove, checkedKing]
  );

  const renderSquare = useCallback(
    (row: number, col: number) => {
      const actualRow = flipped ? 7 - row : row;
      const actualCol = flipped ? 7 - col : col;
      const square = rowColToSquare(actualRow, actualCol);
      const piece = board[actualRow][actualCol];
      const bg = getSquareBackground(actualRow, actualCol);
      const isLight = (actualRow + actualCol) % 2 === 0;
      const isLegalMove = legalMoves.includes(square);

      const pieceKey = piece
        ? `${piece.color}${piece.type.toUpperCase()}`
        : null;
      const symbol = pieceKey ? PIECE_SYMBOLS[pieceKey] : null;

      return (
        <TouchableOpacity
          key={square}
          style={[styles.square, { backgroundColor: bg }]}
          onPress={() => onSquarePress(square)}
          activeOpacity={0.85}
        >
          {/* Legal move dot */}
          {isLegalMove && !piece && (
            <View style={styles.legalDot} />
          )}

          {/* Legal move ring if capture */}
          {isLegalMove && piece && (
            <View style={styles.captureRing} />
          )}

          {/* Piece */}
          {symbol && (
            <Text
              style={[
                styles.piece,
                { color: piece?.color === 'w' ? '#fff' : '#1a0f05' },
              ]}
            >
              {symbol}
            </Text>
          )}

          {/* Rank label — leftmost column */}
          {col === 0 && (
            <Text
              style={[
                styles.rankLabel,
                { color: isLight ? GAME_CONFIG.board.darkSquare : GAME_CONFIG.board.lightSquare },
              ]}
            >
              {RANKS[actualRow]}
            </Text>
          )}

          {/* File label — bottom row */}
          {row === 7 && (
            <Text
              style={[
                styles.fileLabel,
                { color: isLight ? GAME_CONFIG.board.darkSquare : GAME_CONFIG.board.lightSquare },
              ]}
            >
              {FILES[actualCol]}
            </Text>
          )}
        </TouchableOpacity>
      );
    },
    [board, getSquareBackground, legalMoves, onSquarePress, flipped]
  );

  return (
    <View style={styles.board}>
      {Array.from({ length: 8 }, (_, row) => (
        <View key={row} style={styles.row}>
          {Array.from({ length: 8 }, (_, col) => renderSquare(row, col))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  board: {
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'rgba(139,94,60,0.6)',
  },
  row: {
    flexDirection: 'row',
  },
  square: {
    flex: 1,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  piece: {
    fontSize: 22,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  legalDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(0,0,0,0.25)',
    position: 'absolute',
  },
  captureRing: {
    position: 'absolute',
    width: '90%',
    height: '90%',
    borderRadius: 100,
    borderWidth: 3,
    borderColor: 'rgba(0,0,0,0.25)',
  },
  rankLabel: {
    position: 'absolute',
    top: 2,
    left: 2,
    fontSize: 8,
    fontWeight: '600',
  },
  fileLabel: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    fontSize: 8,
    fontWeight: '600',
  },
});