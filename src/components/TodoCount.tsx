type Props = {
  pending: number;
  completed: number;
};

export default function TodoCount({ pending, completed }: Props) {
  return (
    <>
      <span>{pending} pending</span>
      <span>•</span>
      <span>{completed} completed</span>
    </>
  );
}
