import { TokenType } from './tokens';

export enum NodeType {
  PROGRAM = 'PROGRAM',
  VARIABLE_DECLARATION = 'VARIABLE_DECLARATION',
  FUNCTION_DECLARATION = 'FUNCTION_DECLARATION',
  CLASS_DECLARATION = 'CLASS_DECLARATION',
  RETURN_STATEMENT = 'RETURN_STATEMENT',
  IF_STATEMENT = 'IF_STATEMENT',
  FOR_STATEMENT = 'FOR_STATEMENT',
  WHILE_STATEMENT = 'WHILE_STATEMENT',
  EXPRESSION_STATEMENT = 'EXPRESSION_STATEMENT',
  BINARY_EXPRESSION = 'BINARY_EXPRESSION',
  UNARY_EXPRESSION = 'UNARY_EXPRESSION',
  CALL_EXPRESSION = 'CALL_EXPRESSION',
  MEMBER_EXPRESSION = 'MEMBER_EXPRESSION',
  ASSIGNMENT_EXPRESSION = 'ASSIGNMENT_EXPRESSION',
  IDENTIFIER = 'IDENTIFIER',
  LITERAL = 'LITERAL',
  BLOCK_STATEMENT = 'BLOCK_STATEMENT',
  JS_BLOCK = 'JS_BLOCK',
}

export interface ASTNode {
  type: NodeType;
  line: number;
  column: number;
}

export interface Program extends ASTNode {
  type: NodeType.PROGRAM;
  body: ASTNode[];
}

export interface VariableDeclaration extends ASTNode {
  type: NodeType.VARIABLE_DECLARATION;
  dataType: TokenType;
  identifier: string;
  initializer?: ASTNode;
}

export interface FunctionDeclaration extends ASTNode {
  type: NodeType.FUNCTION_DECLARATION;
  returnType: TokenType;
  name: string;
  parameters: { type: TokenType; name: string }[];
  body: BlockStatement;
}

export interface ClassDeclaration extends ASTNode {
  type: NodeType.CLASS_DECLARATION;
  name: string;
  members: VariableDeclaration[];
  methods: FunctionDeclaration[];
}

export interface ReturnStatement extends ASTNode {
  type: NodeType.RETURN_STATEMENT;
  value?: ASTNode;
}

export interface IfStatement extends ASTNode {
  type: NodeType.IF_STATEMENT;
  condition: ASTNode;
  thenBranch: ASTNode;
  elseBranch?: ASTNode;
}

export interface ForStatement extends ASTNode {
  type: NodeType.FOR_STATEMENT;
  initializer?: ASTNode;
  condition?: ASTNode;
  increment?: ASTNode;
  body: ASTNode;
}

export interface WhileStatement extends ASTNode {
  type: NodeType.WHILE_STATEMENT;
  condition: ASTNode;
  body: ASTNode;
}

export interface ExpressionStatement extends ASTNode {
  type: NodeType.EXPRESSION_STATEMENT;
  expression: ASTNode;
}

export interface BinaryExpression extends ASTNode {
  type: NodeType.BINARY_EXPRESSION;
  operator: TokenType;
  left: ASTNode;
  right: ASTNode;
}

export interface UnaryExpression extends ASTNode {
  type: NodeType.UNARY_EXPRESSION;
  operator: TokenType;
  operand: ASTNode;
}

export interface CallExpression extends ASTNode {
  type: NodeType.CALL_EXPRESSION;
  callee: ASTNode;
  arguments: ASTNode[];
}

export interface MemberExpression extends ASTNode {
  type: NodeType.MEMBER_EXPRESSION;
  object: ASTNode;
  property: string;
}

export interface AssignmentExpression extends ASTNode {
  type: NodeType.ASSIGNMENT_EXPRESSION;
  operator: TokenType;
  target: ASTNode;
  value: ASTNode;
}

export interface Identifier extends ASTNode {
  type: NodeType.IDENTIFIER;
  name: string;
}

export interface Literal extends ASTNode {
  type: NodeType.LITERAL;
  value: string | number | boolean;
  dataType: TokenType;
}

export interface BlockStatement extends ASTNode {
  type: NodeType.BLOCK_STATEMENT;
  statements: ASTNode[];
}

export interface JSBlock extends ASTNode {
  type: NodeType.JS_BLOCK;
  code: string;
}
