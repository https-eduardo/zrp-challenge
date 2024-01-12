export class DateUtils {
  static formatDate(date: Date) {
    return date.toLocaleString("pt-BR", {
      month: "2-digit",
      year: "numeric",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  }
}
