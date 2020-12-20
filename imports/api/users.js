import SimpleSchema from 'simpl-schema';
import { Accounts } from 'meteor/accounts-base';

Accounts.validateNewUser((user) => {
  const email = user.emails[0].address;
  const { firstName, lastName } = user.profile;

  new SimpleSchema({
    email: {
      type: String,
      regEx: SimpleSchema.RegEx.Email,
    },
    firstName: {
      type: String,
      required: true,
      custom: function () {
        if (!this.value.length) {
          return SimpleSchema.ErrorTypes.REQUIRED;
        }
      },
    },
    lastName: {
      type: String,
      required: true,
      custom: function () {
        if (!this.value.length) {
          return SimpleSchema.ErrorTypes.REQUIRED;
        }
      },
    },
  }).validate({ email, firstName, lastName });

  return true;
});
