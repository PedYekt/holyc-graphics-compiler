/**
 * HolyC Token Types
 * Based on TempleOS HolyC language specification
 */
export enum TokenType {
  // Literals
  NUMBER = 'NUMBER',
  STRING = 'STRING',
  CHAR = 'CHAR',
  TRUE = 'TRUE',
  FALSE = 'FALSE',

  // Identifiers
  IDENTIFIER = 'IDENTIFIER',

  // Types
  I0 = 'I0',
  U0 = 'U0',
  I8 = 'I8',
  U8 = 'U8',
  I16 = 'I16',
  U16 = 'U16',
  I32 = 'I32',
  U32 = 'U32',
  I64 = 'I64',
  U64 = 'U64',
  F64 = 'F64',
  BOOL = 'BOOL',

  // Keywords
  IF = 'IF',
  ELSE = 'ELSE',
  FOR = 'FOR',
  WHILE = 'WHILE',
  DO = 'DO',
  RETURN = 'RETURN',
  CLASS = 'CLASS',
  DEFINE = 'DEFINE',
  INCLUDE = 'INCLUDE',

  // Operators
  PLUS = 'PLUS',
  MINUS = 'MINUS',
  MULTIPLY = 'MULTIPLY',
  DIVIDE = 'DIVIDE',
  MODULO = 'MODULO',
  ASSIGN = 'ASSIGN',
  PLUS_ASSIGN = 'PLUS_ASSIGN',
  MINUS_ASSIGN = 'MINUS_ASSIGN',
  MULTIPLY_ASSIGN = 'MULTIPLY_ASSIGN',
  DIVIDE_ASSIGN = 'DIVIDE_ASSIGN',
  INCREMENT = 'INCREMENT',
  DECREMENT = 'DECREMENT',

  // Comparison
  EQUAL = 'EQUAL',
  NOT_EQUAL = 'NOT_EQUAL',
  LESS_THAN = 'LESS_THAN',
  GREATER_THAN = 'GREATER_THAN',
  LESS_EQUAL = 'LESS_EQUAL',
  GREATER_EQUAL = 'GREATER_EQUAL',

  // Logical
  AND = 'AND',
  OR = 'OR',
  NOT = 'NOT',

  // Punctuation
  SEMICOLON = 'SEMICOLON',
  COMMA = 'COMMA',
  DOT = 'DOT',
  LPAREN = 'LPAREN',
  RPAREN = 'RPAREN',
  LBRACE = 'LBRACE',
  RBRACE = 'RBRACE',
  LBRACKET = 'LBRACKET',
  RBRACKET = 'RBRACKET',

  // Special
  EOF = 'EOF',
  COMMENT = 'COMMENT',
  JS_BLOCK = 'JS_BLOCK',
}

export interface Token {
  type: TokenType;
  value: string | number;
  line: number;
  column: number;
}

export const KEYWORDS: Record<string, TokenType> = {
  'if': TokenType.IF,
  'else': TokenType.ELSE,
  'for': TokenType.FOR,
  'while': TokenType.WHILE,
  'do': TokenType.DO,
  'return': TokenType.RETURN,
  'class': TokenType.CLASS,
  'TRUE': TokenType.TRUE,
  'FALSE': TokenType.FALSE,
  'Bool': TokenType.BOOL,
  'I0': TokenType.I0,
  'U0': TokenType.U0,
  'I8': TokenType.I8,
  'U8': TokenType.U8,
  'I16': TokenType.I16,
  'U16': TokenType.U16,
  'I32': TokenType.I32,
  'U32': TokenType.U32,
  'I64': TokenType.I64,
  'U64': TokenType.U64,
  'F64': TokenType.F64,
};
