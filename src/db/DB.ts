// 実際にはORMを使うことが一般的だと思われるが、便宜上このDBクラスをORMのような扱いとする
// - ORM例
//   - Drizzle: https://orm.drizzle.team/
//   - Prisma: https://www.prisma.io/
export default class DB {
  private nextId = 1;

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  async insert(_: any): Promise<number> {
    // 実際にDBにはuser情報を保存する処理を記述する。
    // ここでは便宜上、常に保存に成功するものとし、保存のたびにidがインクリメントされるようにしている。
    const recordId = this.nextId++;

    return recordId;
  }
}
