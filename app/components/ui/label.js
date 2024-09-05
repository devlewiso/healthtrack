export const Label = ({ htmlFor, children }) => {
  return (
    <label htmlFor={htmlFor} style={{ display: 'block', marginBottom: '5px' }}>
      {children}
    </label>
  );
};
