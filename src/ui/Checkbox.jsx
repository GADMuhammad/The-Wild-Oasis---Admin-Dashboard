const Checkbox = ({ checked, onChange, disabled = false, id, children }) => {
  return (
    <div className={disabled ? "checkbox-disabled" : ""}>
      <div className="checkbox-container flex items-center gap-[1.6rem]">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
        />

        <label className="checkbox-circle" htmlFor={!disabled ? id : ""}>
          <span className="tick_mark" />
        </label>

        {children && (
          <label className="checkbox-text" htmlFor={!disabled ? id : ""}>
            {children}
          </label>
        )}
      </div>
    </div>
  );
};

export default Checkbox;
