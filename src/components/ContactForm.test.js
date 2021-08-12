import React from "react";
import {
  getByText,
  queryAllByTestId,
  queryByRole,
  queryByText,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ContactForm from "./ContactForm";

test("renders without errors", () => {
  render(<ContactForm />);
});

test("renders the contact form header", () => {
  //Arrange
  render(<ContactForm />);

  //Act
  const header = screen.queryByText(/Contact Form/);

  //Assert
  expect(header).toBeInTheDocument();
  expect(header).toBeTruthy()
  expect(header).toHaveTextContent('Contact Form')
});

test("renders ONE error message if user enters less then 5 characters into firstname.", async () => {
  render(<ContactForm />);
  //Arrange
  const firstNameInput = screen.queryByLabelText(/First Name/);
  //Act
  userEvent.type(firstNameInput, "Chev");

  const firstError = screen.queryByText(
    /Error: firstName must have at least 5 characters./
  );
  //Assert
  expect(firstError).toBeInTheDocument();
});

test("renders THREE error messages if user enters no values into any fields.", async () => {
  render(<ContactForm />);
  //Arrange
  const firstNameInput = screen.queryByLabelText(/First Name/);
  const lastNameInput = screen.queryByLabelText(/Last Name/);
  const emailInput = screen.queryByLabelText(/Email/);
  const submit = screen.queryByRole("button");
  //Act
  userEvent.type(firstNameInput, "");
  userEvent.type(lastNameInput, "");
  userEvent.type(emailInput, "");
  userEvent.click(submit);

  const firstError = screen.queryByText(
    /Error: firstName must have at least 5 characters./
  );
  const secondError = screen.queryByText(
    /Error: lastName is a required field./
  );
  const thirdError = screen.queryByText(
    /Error: email must be a valid email address./
  );

  //Assert
  expect(firstError).toBeInTheDocument();
  expect(secondError).toBeInTheDocument();
  expect(thirdError).toBeInTheDocument();
});

test("renders ONE error message if user enters a valid first name and last name but no email.", async () => {
  render(<ContactForm />);
  //Arrange
  const firstNameInput = screen.queryByLabelText(/First Name/);
  const lastNameInput = screen.queryByLabelText(/Last Name/);
  const emailInput = screen.queryByLabelText(/Email/);
  const submit = screen.queryByRole("button");
  //Act
  userEvent.type(firstNameInput, "Chevy");
  userEvent.type(lastNameInput, "Jackson");
  userEvent.type(emailInput, "");
  userEvent.click(submit);

  const emailError = screen.queryByText(
    /Error: email must be a valid email address./
  );

  //Assert
  expect(emailError).toBeInTheDocument();
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
  render(<ContactForm />);
  //Arrange
  const emailInput = screen.queryByLabelText(/Email/);
  //Act
  userEvent.type(emailInput, "bhhjkhk");
  const emailError = screen.queryByText(
    /Error: email must be a valid email address./
  );
  //Assert
  expect(emailError).toBeInTheDocument();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
  render(<ContactForm />);
  //Arrange
  const lastNameInput = screen.queryByLabelText(/Last Name/);
  const submit = screen.queryByRole("button");
  //Act
  userEvent.type(lastNameInput, "");
  userEvent.click(submit);
  const lastNameError = screen.queryByText(
    /Error: lastName is a required field./
  );
  //Assert
  expect(lastNameError).toBeInTheDocument();
});

test("renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.", async () => {
  render(<ContactForm />);
  //Arrange
  const firstNameInput = screen.queryByLabelText(/First Name/);
  const lastNameInput = screen.queryByLabelText(/Last Name/);
  const emailInput = screen.queryByLabelText(/Email/);
  const submit = screen.queryByRole("button");
  //Act
  userEvent.type(firstNameInput, "Chavion");
  userEvent.type(lastNameInput, "Jackson");
  userEvent.type(emailInput, "chavionjackson@yahoo.com");
  userEvent.click(submit);
  const firstNameDisplay = screen.queryByTestId(/firstnameDisplay/);
  const lastNameDisplay = screen.queryByTestId(/lastnameDisplay/);
  const emailDisplay = screen.queryByTestId(/emailDisplay/);

  //Assert
  expect(firstNameDisplay).toBeInTheDocument();
  expect(lastNameDisplay).toBeInTheDocument();
  expect(emailDisplay).toBeInTheDocument();
});

test("renders all fields text when all fields are submitted.", async () => {
  render(<ContactForm />);
  //Arrange
  const firstNameInput = screen.queryByLabelText(/First Name/);
  const lastNameInput = screen.queryByLabelText(/Last Name/);
  const emailInput = screen.queryByLabelText(/Email/);
  const messageInput = screen.queryByLabelText(/Message/);
  const submit = screen.queryByRole("button");
  //Act
  userEvent.type(firstNameInput, "Chavion");
  userEvent.type(lastNameInput, "Jackson");
  userEvent.type(emailInput, "chavionjackson@yahoo.com");
  userEvent.type(messageInput, "chavionjackson@yahoo.com");
  userEvent.click(submit);
  const firstNameDisplay = screen.queryByTestId(/firstnameDisplay/);
  const lastNameDisplay = screen.queryByTestId(/lastnameDisplay/);
  const emailDisplay = screen.queryByTestId(/emailDisplay/);
  const messageDisplay = screen.queryByTestId(/messageDisplay/);

  //Assert
  expect(firstNameDisplay).toBeInTheDocument();
  expect(lastNameDisplay).toBeInTheDocument();
  expect(emailDisplay).toBeInTheDocument();
  expect(messageDisplay).toBeInTheDocument();
});
