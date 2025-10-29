
export interface RuntimeOutput {
  stdout: string;
  stderr: string;
  graphics: GraphicsCommand[];
}

export interface GraphicsCommand {
  type: 'pixel' | 'line' | 'rect' | 'circle' | 'sprite' | 'clear' | 'text';
  params: any;
}

export class HolyCRuntime {
  private stdout: string[] = [];
  private stderr: string[] = [];
  private graphics: GraphicsCommand[] = [];
  private variables: Map<string, any> = new Map();
  private functions: Map<string, Function> = new Map();

  constructor() {
    this.registerBuiltins();
  }

  private registerBuiltins(): void {
    // Print function
    this.functions.set('Print', (...args: any[]) => {
      this.stdout.push(args.map(String).join(' '));
    });

    // Graphics primitives
    this.functions.set('GrPixel', (x: number, y: number, color: number) => {
      this.graphics.push({ type: 'pixel', params: { x, y, color } });
    });

    this.functions.set('GrLine', (x1: number, y1: number, x2: number, y2: number, color: number) => {
      this.graphics.push({ type: 'line', params: { x1, y1, x2, y2, color } });
    });

    this.functions.set('GrRect', (x: number, y: number, w: number, h: number, color: number) => {
      this.graphics.push({ type: 'rect', params: { x, y, w, h, color } });
    });

    this.functions.set('GrCircle', (x: number, y: number, r: number, color: number) => {
      this.graphics.push({ type: 'circle', params: { x, y, r, color } });
    });

    this.functions.set('GrClear', (color: number = 0) => {
      this.graphics.push({ type: 'clear', params: { color } });
    });

    this.functions.set('GrText', (x: number, y: number, text: string, color: number) => {
      this.graphics.push({ type: 'text', params: { x, y, text, color } });
    });

    // Math functions
    this.functions.set('Sin', Math.sin);
    this.functions.set('Cos', Math.cos);
    this.functions.set('Tan', Math.tan);
    this.functions.set('Sqrt', Math.sqrt);
    this.functions.set('Abs', Math.abs);

    // Random
    this.functions.set('Rand', () => Math.random());
    this.functions.set('RandI', (max: number) => Math.floor(Math.random() * max));
  }

  public execute(code: string): RuntimeOutput {
    this.stdout = [];
    this.stderr = [];
    this.graphics = [];

    try {
      // For now, simple pattern matching for common HolyC patterns
      // This is a proof-of-concept - full implementation would use proper parser
      this.simpleExecute(code);

    } catch (error: any) {
      this.stderr.push(`Error: ${error.message}`);
    }

    return {
      stdout: this.stdout.join('\n'),
      stderr: this.stderr.join('\n'),
      graphics: this.graphics,
    };
  }

  private simpleExecute(code: string): void {
    // Execute code directly without requiring js{} wrapper
    try {
      // Create a context with our functions
      const context: any = {
        Print: this.functions.get('Print'),
        GrPixel: this.functions.get('GrPixel'),
        GrLine: this.functions.get('GrLine'),
        GrRect: this.functions.get('GrRect'),
        GrCircle: this.functions.get('GrCircle'),
        GrClear: this.functions.get('GrClear'),
        GrText: this.functions.get('GrText'),
        Sin: Math.sin,
        Cos: Math.cos,
        Rand: this.functions.get('Rand'),
        RandI: this.functions.get('RandI'),
      };

      // Execute JavaScript directly
      const funcArgs = Object.keys(context);
      const funcBody = code;
      const func = new Function(...funcArgs, funcBody);
      func(...Object.values(context));
    } catch (error: any) {
      this.stderr.push(`Execution Error: ${error.message}`);
    }
  }

  public reset(): void {
    this.stdout = [];
    this.stderr = [];
    this.graphics = [];
    this.variables.clear();
  }
}
