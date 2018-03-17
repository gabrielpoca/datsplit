import React from 'react';
import { Form } from 'react-form';
import { Link } from 'react-router-dom';
import {
  Form as MyForm,
  Fieldset,
  Label,
  Error,
  Actions
} from '../../common/Form';

import Body from '../../common/Body';
import Button from '../../common/Button';
import ButtonLink from '../../common/ButtonLink';
import Header from '../../common/Header';
import FormTextInput from '../../common/FormTextInput';

import './index.css';

const errorValidator = values => ({
  address: !values.address
    ? 'Please paste a valid DAT address'
    : !values.address.startsWith('dat://')
      ? 'A DAT address must start with dat://'
      : values.address.endsWith('/') || values.address.endsWith('#')
        ? 'A DAT address cannot end with / or #'
        : null
});

class ImportGroupForm extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    this.props.onImportGroup({ url: values.address });
    this.props.history.push('/');
  }

  render() {
    return (
      <div styleName="root">
        <Form validate={errorValidator} onSubmit={this.handleSubmit}>
          {({ touched, errors, submitForm }) => (
            <MyForm onSubmit={submitForm}>
              <Fieldset>
                <Label>
                  <label htmlFor="address">Address</label>
                </Label>
                <FormTextInput
                  id="address"
                  field="address"
                  placeholder="dat://..."
                />
                <Error>
                  {touched.address && errors && errors.address
                    ? errors.address
                    : null}
                </Error>
              </Fieldset>
              <Actions>
                <Button>
                  <button type="submit">Import</button>
                </Button>
              </Actions>
            </MyForm>
          )}
        </Form>
        <Body.Actions>
          <ButtonLink>
            <Link to="/">Cancel</Link>
          </ButtonLink>
        </Body.Actions>
      </div>
    );
  }
}

export default ImportGroupForm;
