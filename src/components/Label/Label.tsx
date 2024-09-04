import "./Label.css";

interface LabelProps {
  fontSize: number;
  children: any;
  styles?: any;
}

const Label = ({ fontSize, children, styles }: LabelProps) => {
  return (
    <span style={{ ...styles, fontSize: `${fontSize.toString()}px` }}>{children}</span>
  );
};

export default Label;
