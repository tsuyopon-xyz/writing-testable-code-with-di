type UserType = {
  id?: number;
  name: string;
  age: number;
};

export default class UserEntity {
  public readonly id?: number;
  public readonly name: string;
  public readonly age: number;

  constructor({ id, name, age }: UserType) {
    const trimmedName = name.trim();

    // 値オブジェクト化して値オブジェクトの方でバリデーションを行った方が綺麗かもしれない。
    // 今回は、解説用としてファイル数が少ない方を優先しEntityの中で値のバリデーションを行っている。
    if (!trimmedName) {
      throw new Error('nameは1文字以上');
    }
    if (age < 0 || !Number.isInteger(age)) {
      throw new Error('ageは0以上の整数');
    }
    if (id !== undefined && (id < 1 || !Number.isInteger(id))) {
      throw new Error('idは1以上の整数、またはundefined');
    }

    this.id = id;
    this.name = trimmedName;
    this.age = age;
  }
}
