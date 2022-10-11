import { Formik } from 'formik';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import { ImSearch } from 'react-icons/im';
import { Header, SearchForm, Button, Label, Input } from './Searchbar.styled';

function SearchBar ({onSubmit}){
  const initialValues = {
    query: '',
  };
  const schema = yup.string().required();

  const hendleSubmit = (values, { resetForm }) => {
    const searchQuery = values.query.split(" ").join("+");
    if (searchQuery) {
      onSubmit(searchQuery);
      resetForm();
    };
  }

  return (
    <Header>
      <Formik initialValues={initialValues}
        validationSchema={schema}
        onSubmit={hendleSubmit}
      >
        <SearchForm>
          <Button type="submit">
            <ImSearch />
            <Label>Search</Label>
          </Button>
          <Input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="query"
          required
          />
        </SearchForm>
      </Formik>
    </Header>
  )
};

SearchBar.propTypes = {
  handleSubmit: PropTypes.func,
}

export default SearchBar;