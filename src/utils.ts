export function GetDescriptiveTipe(type: string): string {
  if (type === "input") {
    return "Entrada"
  }
  if (type === "output") {
    return "Salida"
  }
  return "indeterminado"
}

export function FormatCurrency(amount: number): string {
  var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  
  return formatter.format(amount);
}

export function DateFormatter(datetime: string): string {
  const newDatetime = new Date(datetime)
  const year = newDatetime.getFullYear()
  const month = newDatetime.getMonth() + 1 
  const date = newDatetime.getDate()
  // const hours = newDatetime.getHours()
  // const minutes = newDatetime.getMinutes()
  // const formattedDate = `${date}/${month}/${year}, ${hours}:${minutes}`
  const formattedDate = `${date}/${month}/${year}`
  return formattedDate
  // return newDatetime.toLocaleString()
}