interface NumberConfig {
  decimalPlaces: number;
  isComma: boolean;
}

const defaultConfig: NumberConfig = {
  decimalPlaces: 2,
  isComma: true,
};
export default function formatAccuracy(value: number, config?: NumberConfig) {
  const { decimalPlaces, isComma } = { ...defaultConfig, ...config };
  if (isNaN(value)) {
    return "-";
  }

  if (typeof decimalPlaces !== "number" || decimalPlaces < 0) {
    throw new Error("Decimal places must be a non-negative number");
  }

  if (isComma) {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: decimalPlaces,
      maximumFractionDigits: decimalPlaces,
    }).format(value);
  }
  return value.toFixed(decimalPlaces);
}
