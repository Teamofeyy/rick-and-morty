type PageMessageProps = {
  children: string;
  error?: boolean;
};

export default function PageMessage({ children, error = false }: PageMessageProps) {
  return (
    <p className="container mx-auto py-16 text-center" role={error ? "alert" : "status"}>
      {children}
    </p>
  );
}
