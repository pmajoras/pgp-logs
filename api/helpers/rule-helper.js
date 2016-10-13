'use strict';



module.exports = {
  isRuleAppliedToMessage: function (rule, message, compiledObject) {
    let isRuleApplied = false;

    if (rule && message) {
      message = message.toUpperCase();
      let valueToCompare = message;

      if (rule.field && compiledObject) {
        let compiledObjectFieldValue = compiledObject[rule.field];
        valueToCompare = (compiledObjectFieldValue || valueToCompare).toUpperCase();
      }

      console.log('isRuleAppliedToMessage >> operator', rule.operator);
      console.log('isRuleAppliedToMessage >> valueToCompare', valueToCompare);
      console.log('isRuleAppliedToMessage >> expectedValue', rule.expectedValue);

      if (rule.operator === 'contains') {
        isRuleApplied = valueToCompare.indexOf(rule.expectedValue.toUpperCase()) > -1;
      }
      else {
        isRuleApplied = valueToCompare === rule.expectedValue.toUpperCase();
      }
    }

    console.log('isRuleAppliedToMessage >> isRuleApplied', isRuleApplied);
    return isRuleApplied;
  }
};
