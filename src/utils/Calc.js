export const TotalPrice = (quantity, price) => {
  return quantity * price;
};

export function resolve(obj, path) {
  path = path.split(".");
  var current = obj;
  while (path.length) {
    if (typeof current !== "object" || current == null) return undefined;
    current = current[path.shift()];
  }
  return current;
}

export const formatDate = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  const formattedToday = dd + "/" + mm + "/" + yyyy;
};

export const getCurrentDateString = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();
  
    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;
  
    return dd + "/" + mm + "/" + yyyy;
  };
