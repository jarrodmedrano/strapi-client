type IconProps = {
  fill?: string;
  size?: string | number;
  height?: string | number;
  width?: string | number;
  label?: string;
};

const PlusIcon: React.FC<IconProps> = ({ fill, size, height, width }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill={fill}
    width={size || width || 24}
    height={size || height || 24}
    viewBox="0 0 24 24"
  >
    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
  </svg>
);

export default PlusIcon;
