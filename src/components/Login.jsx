import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import { useHistory } from "react-router-dom";

const initialValues = {
  ad: "",
  soyad: "",
  email: "",
  password: "",
};

const errorMessages = {
  ad: "Adınızı en az 3 karakter giriniz",
  soyad: "Soyadınızı en az 3 karakter giriniz",
  email: "Geçerli bir email giriniz",
  password:
    "En az 8 karakter, en az 1 büyük harf, en az 1 küçük harf, en az 1 sembol ve en az 1 rakam içermelidir ",
};
export function Login() {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({
    ad: false,
    soyad: false,
    email: false,
    password: false,
  });
  const [isValid, setIsValid] = useState(false);

  const history = useHistory();

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  var regularExpression =
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

  useEffect(() => {
    if (
      formData.ad.trim().length >= 3 &&
      formData.soyad.trim().length >= 3 &&
      validateEmail(formData.email) &&
      regularExpression.test(formData.password)
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [formData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });

    if (name === "ad" || name === "soyad") {
      if (value.trim().length >= 3) {
        setErrors({ ...errors, [name]: false });
      } else {
        setErrors({ ...errors, [name]: true });
      }
    }
    if (name === "email") {
      if (validateEmail(value)) {
        setErrors({ ...errors, [name]: false });
      } else {
        setErrors({ ...errors, [name]: true });
      }
    }
    if (name === "password") {
      if (regularExpression.test(value)) {
        setErrors({ ...errors, [name]: false });
      } else {
        setErrors({ ...errors, [name]: true });
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isValid) return;
    history.push("/Success");
  };

  return (
    <Card>
      <CardHeader>Kayıt Ol</CardHeader>
      <CardBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="ad">Adınız:</Label>
            <Input
              id="ad"
              name="ad"
              placeholder="Adınızı giriniz"
              type="ad"
              onChange={handleChange}
              value={formData.ad}
              invalid={errors.ad}
              data-cy="ad-input"
            />
            {errors.ad && (
              <FormFeedback data-cy="error-message">
                {errorMessages.ad}
              </FormFeedback>
            )}
          </FormGroup>
          <FormGroup>
            <Label for="soyad">Soyadınız:</Label>
            <Input
              id="soyad"
              name="soyad"
              placeholder="Soyadınızı giriniz"
              type="soyad"
              onChange={handleChange}
              value={formData.soyad}
              invalid={errors.soyad}
              data-cy="soyad-input"
            />
            {errors.soyad && (
              <FormFeedback data-cy="error-message">
                {errorMessages.soyad}
              </FormFeedback>
            )}
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              id="email"
              name="email"
              placeholder="Kurumsal email adresinizi giriniz"
              type="email"
              onChange={handleChange}
              value={formData.email}
              invalid={errors.email}
              data-cy="email-input"
            />
            {errors.email && (
              <FormFeedback data-cy="error-message">
                {errorMessages.email}
              </FormFeedback>
            )}
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              id="password"
              name="password"
              placeholder="Şifre giriniz"
              type="password"
              onChange={handleChange}
              value={formData.password}
              invalid={errors.password}
              data-cy="password-input"
            />
            {errors.password && (
              <FormFeedback data-cy="error-message">
                {errorMessages.password}
              </FormFeedback>
            )}
          </FormGroup>

          <Button disabled={!isValid} data-cy="submit-button">
            Kayıt Ol
          </Button>
        </Form>
      </CardBody>
    </Card>
  );
}
