export function GetDescriptiveTipe(type: string): string {
  if (type === "input") {
    return "Cobro";
  }
  if (type === "output") {
    return "Pago";
  }
  return "indeterminado";
}

export function FormatUSDCurrency(amount: number): string {
  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  return formatter.format(amount);
}

export function FormatVESCurrency(amount: number): string {
  var formatter = new Intl.NumberFormat("es-US", {
    style: "currency",
    currency: "VES",
  });
  return formatter.format(amount).replace("VES", "Bs");
}

export function DateFormatter(datetime: string): string {
  const newDatetime = new Date(datetime);
  const year = newDatetime.getFullYear();
  const month = newDatetime.getMonth() + 1;
  const date = newDatetime.getDate();
  // const hours = newDatetime.getHours()
  // const minutes = newDatetime.getMinutes()
  // const formattedDate = `${date}/${month}/${year}, ${hours}:${minutes}`
  const formattedDate = `${date}/${month}/${year}`;
  return formattedDate;
  // return newDatetime.toLocaleString()
}

export function GetToday(): string {
  const date = new Date();
  const [m, d, y] = date.toLocaleDateString().split("/");
  const m0 = m.length === 1 ? "0" + m : m;
  const today = `${y}-${m0}-${d}`;
  return today;
}
