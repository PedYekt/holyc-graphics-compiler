import type { Token } from '../types/tokens';
import { TokenType, KEYWORDS } from '../types/tokens';

export class Lexer {
  private source: string;
  private position: number = 0;
  private line: number = 1;
  private column: number = 1;
  private currentChar: string | null;

  constructor(source: string) {
    this.source = source;
    this.currentChar = source.length > 0 ? source[0] : null;
  }

  private advance(): void {
    if (this.currentChar === '\n') {
      this.line++;
      this.column = 1;
    } else {
      this.column++;
    }
    this.position++;
    this.currentChar = this.position < this.source.length ? (this.source[this.position] ?? null) : null;
  }

  private peek(offset: number = 1): string | null {
    const peekPos = this.position + offset;
    return peekPos < this.source.length ? (this.source[peekPos] ?? null) : null;
  }

  private skipWhitespace(): void {
    while (this.currentChar && /\s/.test(this.currentChar)) {
      this.advance();
    }
  }

  private skipLineComment(): void {
    while (this.currentChar && this.currentChar !== '\n') {
      this.advance();
    }
  }

  private skipBlockComment(): void {
    while (this.currentChar) {
      if (this.currentChar === '*' && this.peek() === '/') {
        this.advance(); // skip *
        this.advance(); // skip /
        break;
      }
      this.advance();
    }
  }

  private readNumber(): Token {
    const line = this.line;
    const column = this.column;
    let numStr = '';
    let hasDecimal = false;

    while (this.currentChar && (/\d/.test(this.currentChar) || this.currentChar === '.')) {
      if (this.currentChar === '.') {
        if (hasDecimal) break;
        hasDecimal = true;
      }
      numStr += this.currentChar;
      this.advance();
    }

    return {
      type: TokenType.NUMBER,
      value: hasDecimal ? parseFloat(numStr) : parseInt(numStr, 10),
      line,
      column,
    };
  }

  private readString(quote: string): Token {
    const line = this.line;
    const column = this.column;
    let str = '';
    this.advance(); // skip opening quote

    while (this.currentChar && this.currentChar !== quote) {
      if (this.currentChar === '\\') {
        this.advance();
        // Handle escape sequences
        const escapeChar: string | null = this.currentChar;
        if (escapeChar === 'n') str += '\n';
        else if (escapeChar === 't') str += '\t';
        else if (escapeChar === 'r') str += '\r';
        else if (escapeChar === '\\') str += '\\';
        else if (escapeChar === quote) str += quote;
        else if (escapeChar) str += escapeChar;
      } else {
        str += this.currentChar;
      }
      this.advance();
    }

    if (this.currentChar === quote) {
      this.advance(); // skip closing quote
    }

    return {
      type: quote === '"' ? TokenType.STRING : TokenType.CHAR,
      value: str,
      line,
      column,
    };
  }

  private readIdentifier(): Token {
    const line = this.line;
    const column = this.column;
    let id = '';

    while (this.currentChar && /[a-zA-Z0-9_#]/.test(this.currentChar)) {
      id += this.currentChar;
      this.advance();
    }

    // Check if it's a keyword
    const type = KEYWORDS[id] || TokenType.IDENTIFIER;

    return {
      type,
      value: id,
      line,
      column,
    };
  }

  private readJSBlock(): Token {
    const line = this.line;
    const column = this.column;
    let code = '';

    // Skip 'js{'
    this.advance(); // skip 's'
    this.advance(); // skip '{'

    while (this.currentChar) {
      if (this.currentChar === '}' && this.peek() === ';') {
        this.advance(); // skip }
        this.advance(); // skip ;
        break;
      }
      code += this.currentChar;
      this.advance();
    }

    return {
      type: TokenType.JS_BLOCK,
      value: code,
      line,
      column,
    };
  }

  public tokenize(): Token[] {
    const tokens: Token[] = [];

    while (this.currentChar) {
      // Skip whitespace
      if (/\s/.test(this.currentChar)) {
        this.skipWhitespace();
        continue;
      }

      // Comments
      if (this.currentChar === '/') {
        if (this.peek() === '/') {
          this.skipLineComment();
          continue;
        } else if (this.peek() === '*') {
          this.advance();
          this.advance();
          this.skipBlockComment();
          continue;
        }
      }

      // JavaScript blocks
      if (this.currentChar === 'j' && this.peek() === 's' && this.peek(2) === '{') {
        tokens.push(this.readJSBlock());
        continue;
      }

      const line = this.line;
      const column = this.column;

      // Numbers
      if (/\d/.test(this.currentChar)) {
        tokens.push(this.readNumber());
        continue;
      }

      // Strings and chars
      if (this.currentChar === '"' || this.currentChar === "'") {
        tokens.push(this.readString(this.currentChar));
        continue;
      }

      // Identifiers and keywords
      if (/[a-zA-Z_#]/.test(this.currentChar)) {
        tokens.push(this.readIdentifier());
        continue;
      }

      // Two-character operators
      if (this.currentChar === '+' && this.peek() === '+') {
        this.advance();
        this.advance();
        tokens.push({ type: TokenType.INCREMENT, value: '++', line, column });
        continue;
      }

      if (this.currentChar === '-' && this.peek() === '-') {
        this.advance();
        this.advance();
        tokens.push({ type: TokenType.DECREMENT, value: '--', line, column });
        continue;
      }

      if (this.currentChar === '+' && this.peek() === '=') {
        this.advance();
        this.advance();
        tokens.push({ type: TokenType.PLUS_ASSIGN, value: '+=', line, column });
        continue;
      }

      if (this.currentChar === '-' && this.peek() === '=') {
        this.advance();
        this.advance();
        tokens.push({ type: TokenType.MINUS_ASSIGN, value: '-=', line, column });
        continue;
      }

      if (this.currentChar === '*' && this.peek() === '=') {
        this.advance();
        this.advance();
        tokens.push({ type: TokenType.MULTIPLY_ASSIGN, value: '*=', line, column });
        continue;
      }

      if (this.currentChar === '/' && this.peek() === '=') {
        this.advance();
        this.advance();
        tokens.push({ type: TokenType.DIVIDE_ASSIGN, value: '/=', line, column });
        continue;
      }

      if (this.currentChar === '=' && this.peek() === '=') {
        this.advance();
        this.advance();
        tokens.push({ type: TokenType.EQUAL, value: '==', line, column });
        continue;
      }

      if (this.currentChar === '!' && this.peek() === '=') {
        this.advance();
        this.advance();
        tokens.push({ type: TokenType.NOT_EQUAL, value: '!=', line, column });
        continue;
      }

      if (this.currentChar === '<' && this.peek() === '=') {
        this.advance();
        this.advance();
        tokens.push({ type: TokenType.LESS_EQUAL, value: '<=', line, column });
        continue;
      }

      if (this.currentChar === '>' && this.peek() === '=') {
        this.advance();
        this.advance();
        tokens.push({ type: TokenType.GREATER_EQUAL, value: '>=', line, column });
        continue;
      }

      if (this.currentChar === '&' && this.peek() === '&') {
        this.advance();
        this.advance();
        tokens.push({ type: TokenType.AND, value: '&&', line, column });
        continue;
      }

      if (this.currentChar === '|' && this.peek() === '|') {
        this.advance();
        this.advance();
        tokens.push({ type: TokenType.OR, value: '||', line, column });
        continue;
      }

      // Single-character tokens
      switch (this.currentChar) {
        case '+':
          tokens.push({ type: TokenType.PLUS, value: '+', line, column });
          this.advance();
          break;
        case '-':
          tokens.push({ type: TokenType.MINUS, value: '-', line, column });
          this.advance();
          break;
        case '*':
          tokens.push({ type: TokenType.MULTIPLY, value: '*', line, column });
          this.advance();
          break;
        case '/':
          tokens.push({ type: TokenType.DIVIDE, value: '/', line, column });
          this.advance();
          break;
        case '%':
          tokens.push({ type: TokenType.MODULO, value: '%', line, column });
          this.advance();
          break;
        case '=':
          tokens.push({ type: TokenType.ASSIGN, value: '=', line, column });
          this.advance();
          break;
        case '<':
          tokens.push({ type: TokenType.LESS_THAN, value: '<', line, column });
          this.advance();
          break;
        case '>':
          tokens.push({ type: TokenType.GREATER_THAN, value: '>', line, column });
          this.advance();
          break;
        case '!':
          tokens.push({ type: TokenType.NOT, value: '!', line, column });
          this.advance();
          break;
        case ';':
          tokens.push({ type: TokenType.SEMICOLON, value: ';', line, column });
          this.advance();
          break;
        case ',':
          tokens.push({ type: TokenType.COMMA, value: ',', line, column });
          this.advance();
          break;
        case '.':
          tokens.push({ type: TokenType.DOT, value: '.', line, column });
          this.advance();
          break;
        case '(':
          tokens.push({ type: TokenType.LPAREN, value: '(', line, column });
          this.advance();
          break;
        case ')':
          tokens.push({ type: TokenType.RPAREN, value: ')', line, column });
          this.advance();
          break;
        case '{':
          tokens.push({ type: TokenType.LBRACE, value: '{', line, column });
          this.advance();
          break;
        case '}':
          tokens.push({ type: TokenType.RBRACE, value: '}', line, column });
          this.advance();
          break;
        case '[':
          tokens.push({ type: TokenType.LBRACKET, value: '[', line, column });
          this.advance();
          break;
        case ']':
          tokens.push({ type: TokenType.RBRACKET, value: ']', line, column });
          this.advance();
          break;
        default:
          throw new Error(`Unexpected character '${this.currentChar}' at line ${line}, column ${column}`);
      }
    }

    tokens.push({ type: TokenType.EOF, value: '', line: this.line, column: this.column });
    return tokens;
  }
}
