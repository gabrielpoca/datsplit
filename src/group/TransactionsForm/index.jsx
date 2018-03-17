import React from 'react';
import { Link } from 'react-router-dom';
import { Form } from 'react-form';
import { isNumber, extend } from 'lodash';
import Big from 'big.js';

import {
  Form as MyForm,
  Fieldset,
  Label,
  Error,
  Actions
} from '../../common/Form';
import FormTextInput from '../../common/FormTextInput';
import FormSelect from '../../common/FormSelect';
import Button from '../../common/Button';
import ButtonLink from '../../common/ButtonLink';
import Heading from '../../common/Heading';

import './index.css';

const errorValidator = values => {
  const from = !values.from
    ? 'Please write the origin of this transaction'
    : values.from === values.to
      ? 'The origin and destination have to be different'
      : null;

  return {
    from,
    description: !values.description ? 'Please write a description' : null,
    to: !values.to ? 'Please write the destination of this transaction' : null,
    amount: !values.amount
      ? 'Please type the amount of this transaction'
      : !isNumber(parseInt(values.amount, 10))
        ? 'Please type a valid amount'
        : null
  };
};

class TransactionsForm extends React.PureComponent {
  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    const { id } = this.props.match.params;

    this.props.onAddTransaction(
      extend(values, {
        amount: Big(values.amount)
          .round(2)
          .toString()
      })
    );

    this.props.history.push(`/group/${id}`);
  }

  peers() {
    return this.props.peers.map(({ name, url }) => ({
      label: name,
      value: url
    }));
  }

  render() {
    return (
      <div styleName="root">
        <Form validate={errorValidator} onSubmit={this.handleSubmit}>
          {({ submitForm, errors, touched }) => (
            <MyForm onSubmit={submitForm}>
              <div styleName="title">
                <Heading kind="h2">New Expense</Heading>
              </div>
              <Fieldset>
                <Label htmlFor="description">Description</Label>
                <FormTextInput
                  id="description"
                  field="description"
                  placeholder="Lunch"
                />
                <Error>
                  {touched.description && errors && errors.description
                    ? errors.description
                    : null}
                </Error>
              </Fieldset>
              <Fieldset>
                <Label htmlFor="amount">Amount</Label>
                <FormTextInput
                  id="amount"
                  field="amount"
                  placeholder="30"
                  type="number"
                />
                <Error>
                  {touched.amount && errors && errors.amount
                    ? errors.amount
                    : null}
                </Error>
              </Fieldset>
              <Fieldset>
                <Label htmlFor="from">Lent by</Label>
                <FormSelect id="from" field="from" options={this.peers()} />
                <Error>
                  {touched.from && errors && errors.from ? errors.from : null}
                </Error>
              </Fieldset>
              <Fieldset>
                <Label htmlFor="to">To</Label>
                <FormSelect id="to" field="to" options={this.peers()} />
                <Error>
                  {touched.to && errors && errors.to ? errors.to : null}
                </Error>
              </Fieldset>
              <Actions>
                <Button>
                  <button type="submit">Add</button>
                </Button>
                <ButtonLink>
                  <Link to={this.props.match.url}>Cancel</Link>
                </ButtonLink>
              </Actions>
            </MyForm>
          )}
        </Form>
      </div>
    );
  }
}

export default TransactionsForm;
