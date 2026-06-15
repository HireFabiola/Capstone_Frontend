import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import apiClient from "../api/apiClient";
import "../App.css";

type RegistrationError = {
  message: string;
  showSignIn?: boolean;
};

type ApiErrorResponse = {
  message?: string;
  error?: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

const getRegistrationError = (error: unknown): RegistrationError => {
  if (!axios.isAxiosError<ApiErrorResponse>(error)) {
    return {
      message: "Something unexpected happened. Please try again.",
    };
  }

  if (!error.response) {
    return {
      message:
        "We could not reach the registration server. Make sure the API is running, then try again.",
    };
  }

  const status = error.response.status;
  const serverMessage = error.response.data?.message ?? "";
  const serverDetails = error.response.data?.error ?? "";
  const combinedMessage = `${serverMessage} ${serverDetails}`.toLowerCase();

  if (
    combinedMessage.includes("already exists") ||
    combinedMessage.includes("duplicate") ||
    combinedMessage.includes("e11000")
  ) {
    return {
      message: "An account with this email already exists. Please sign in instead.",
      showSignIn: true,
    };
  }

  if (status === 400 || status === 422) {
    return {
      message:
        serverMessage ||
        "The registration details are invalid. Review the form and try again.",
    };
  }

  if (status === 404) {
    return {
      message:
        "The registration service could not be found. Check the API URL and try again.",
    };
  }

  if (status >= 500) {
    return {
      message:
        "The server could not create your account. Please try again in a moment.",
    };
  }

  return {
    message: serverMessage || "Registration failed. Please try again.",
  };
};

const AdminRegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState<RegistrationError | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError(null);

    const normalizedName = name.trim();
    const normalizedEmail = email.trim().toLowerCase();

    if (normalizedName.length < 2) {
      setError({
        message: "Please enter your full name.",
      });
      return;
    }

    if (!emailPattern.test(normalizedEmail)) {
      setError({
        message: "Enter a valid email address, such as name@example.com.",
      });
      return;
    }

    if (password !== confirmPassword) {
      setError({
        message: "The passwords do not match. Re-enter both passwords.",
      });
      return;
    }

    if (!passwordPattern.test(password)) {
      setError({
        message:
          "Password must be at least 8 characters and include a letter and a number.",
      });
      return;
    }

    setIsLoading(true);

    try {
      await apiClient.post(
        "/auth/register",
        {
          name: normalizedName,
          email: normalizedEmail,
          password,
        }
      );

      setIsRegistered(true);
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("Registration failed:", error);
      setError(getRegistrationError(error));
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setIsRegistered(false);
  };

  return (
    <main className="admin-login-page">
      <div className="admin-login-card">
        <div className="admin-login-header">
          <p>ADMIN PORTAL</p>

          <h1>Create Account</h1>

          <span>
            Register to manage inquiries,
            projects, and tasks.
          </span>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <label htmlFor="name">
            Full Name
            <input
              id="name"
              type="text"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              autoComplete="name"
              required
            />
          </label>

          <label htmlFor="email">
            Email Address
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              autoComplete="email"
              required
            />
          </label>

          <label htmlFor="password">
            Password
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              autoComplete="new-password"
              aria-describedby="password-requirements"
              minLength={8}
              required
            />
            <span id="password-requirements" className="field-help">
              Use at least 8 characters with a letter and a number.
            </span>
          </label>

          <label htmlFor="confirmPassword">
            Confirm Password
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(event) =>
                setConfirmPassword(event.target.value)
              }
              autoComplete="new-password"
              minLength={8}
              required
            />
          </label>

          {error && (
            <div className="login-error" role="alert" aria-live="polite">
              <span>{error.message}</span>
              {error.showSignIn && (
                <Link to="/auth/login" className="login-error-link">
                  Go to sign in
                </Link>
              )}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
          >
            {isLoading
              ? "REGISTERING..."
              : "REGISTER →"}
          </button>

          <p className="register-link-text">
            Already have an account?{" "}
            <Link to="/auth/login" className="register-link">
              Sign in
            </Link>
          </p>
        </form>
      </div>

      {isRegistered && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Account Created</h2>
            <p>
              Thank you for registering. Your account was created successfully.
              Please sign in to access the admin dashboard.
            </p>

            <div className="modal-actions">
              <Link to="/auth/login" className="success-button">
                Sign In Now →
              </Link>

              <button
                className="success-button secondary"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default AdminRegisterPage;
