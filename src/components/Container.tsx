interface Props {
  children: React.ReactNode;
}

const Container = ({ children }: Props) => (
  <div className="container">{children}</div>
);

export default Container;
