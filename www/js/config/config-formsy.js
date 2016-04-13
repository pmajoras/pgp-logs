import Formsy from "formsy-react";

module.exports = () => {

  Formsy.addValidationRule('isRequired', function(values, value) {
    return (value && (typeof value == 'string' && value.length > 0)) === true;
  });
};

