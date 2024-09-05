export const Input = ({ id, type, value, onChange, placeholder }) => {
  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{
        padding: '10px',
        width: '100%',
        borderRadius: '5px',
        border: '1px solid #ccc',
        marginBottom: '10px'
      }}
    />
  );
};
