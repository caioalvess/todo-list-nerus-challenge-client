type Props = {
  pending: number;
  completed: number;
};

export default function TodoCount({ pending, completed }: Props) {
  return (
    <>
      <span>{pending} pendentes</span>
      <span>•</span>
      <span>{completed} concluídas</span>
    </>
  );
}
