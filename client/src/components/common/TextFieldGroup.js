import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const TextFieldGroup = ({
  type,
  name,
  value,
  placeholder,
  error,
  onChange,
  label,
  disabled,
  info
}) => {
  return (
    <div className="form-group">
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        error={error}
        onChange={onChange}
        disabled={disabled}
        className={classnames("form-control form-control-lg", {
          "is-invalid": error
        })}
      />
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

TextFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.object,
  type: PropTypes.string.isRequired,
  disabled: PropTypes.string,
  placeholder: PropTypes.string,
  info: PropTypes.string,
  label: PropTypes.string
};

TextFieldGroup.defaultProps = {
  type: "text"
};

export default TextFieldGroup;
