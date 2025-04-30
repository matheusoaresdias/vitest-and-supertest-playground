export default function createError(message: string, statusCode: number) {
  const err = new Error(message);
  (err as any).statusCode = statusCode
  return err
}
