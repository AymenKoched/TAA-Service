export class StringArray extends Array<string> {
  constructor(value?: string | string[]) {
    if (typeof value == 'number') {
      super(value);
    } else {
      super();
      if (value) {
        const arr = typeof value === 'string' ? value.split(',') : value;
        this.push(
          ...(<any>(
            arr.filter((i) => i).map((i) => decodeURIComponent(i.trim()))
          )),
        );
      }
    }
  }
}

export class NumberArray extends Array<number> {
  constructor(value: string | string[]) {
    if (typeof value == 'number') {
      super(value);
    } else {
      super();
      if (value) {
        const arr = typeof value === 'string' ? value.split(',') : value;
        this.push(...arr.filter((i) => i).map((i) => +i.trim()));
      }
    }
  }
}
