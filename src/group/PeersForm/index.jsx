import React from 'react';
import { Link } from 'react-router-dom';
import { Form } from 'react-form';

import {
  Form as MyForm,
  Fieldset,
  Label,
  Error,
  Actions
} from '../../common/Form';
import FormTextInput from '../../common/FormTextInput';
import Button from '../../common/Button';
import Body from '../../common/Body';
import ButtonLink from '../../common/ButtonLink';
import Heading from '../../common/Heading';

import './index.css';

const errorValidator = values => ({
  name: !values.name ? 'Please write a name' : null,
  url: !values.url
    ? 'Please paste a valid DAT address'
    : !values.url.startsWith('dat://')
      ? 'A DAT address must start with dat://'
      : values.url.endsWith('/') || values.url.endsWith('#')
        ? 'A DAT address cannot end with / or #'
        : null
});

class PeersForm extends React.PureComponent {
  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    const { id } = this.props.match.params;
    this.props.onAddPeer(values);
    this.props.history.push(`/group/${id}`);
  }

  render() {
    return (
      <div styleName="root">
        <Form validate={errorValidator} onSubmit={this.handleSubmit}>
          {({ submitForm, errors, touched }) => (
            <MyForm onSubmit={submitForm}>
              <div styleName="title">
                <Heading kind="h2">New Peer</Heading>
              </div>
              <Fieldset>
                <Label htmlFor="name">Name</Label>
                <FormTextInput id="name" placeholder="Name" field="name" />
                <Error>
                  {touched.name && errors && errors.name ? errors.name : null}
                </Error>
              </Fieldset>
              <Fieldset>
                <Label htmlFor="url">Address</Label>
                <FormTextInput id="url" field="url" placeholder="url" />
                <Error>
                  {touched.url && errors && errors.url ? errors.url : null}
                </Error>
              </Fieldset>
              <Actions>
                <Button>
                  <button type="submit">Add</button>
                </Button>
              </Actions>
            </MyForm>
          )}
        </Form>
        <Body.Actions>
          <ButtonLink>
            <Link to={this.props.match.url}>Cancel</Link>
          </ButtonLink>
        </Body.Actions>
      </div>
    );
  }
}

export default PeersForm;
