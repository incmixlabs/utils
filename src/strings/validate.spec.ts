import { validEmail, validPhone } from './validate';
import { describe, expect, it } from "vitest"

describe('validEmail', () => {

  it('should return true for a valid email address', () => {
    expect(validEmail('test@example.com')).to.be.true;
    expect(validEmail('user.name+tag+sorting@example.com')).to.be.true;
    expect(validEmail('customer/department=shipping@example.com')).to.be.true;
    expect(validEmail('1234567890@example.com')).to.be.true;
    expect(validEmail('email@subdomain.example.com')).to.be.true;
    expect(validEmail('firstname-lastname@example.com')).to.be.true;
  });

  it('should return false for an invalid email address', () => {
    expect(validEmail('plainaddress')).to.be.false;
    expect(validEmail('@missingusername.com')).to.be.false;
    expect(validEmail('username@.com')).to.be.false;
    expect(validEmail('username@.com.')).to.be.false;
    expect(validEmail('username@com')).to.be.false;
    expect(validEmail('username@toolongtopleveldomainparttoolong')).to.be.false;
    expect(validEmail('username@123.456.789.0123')).to.be.false; // Invalid IP format
    expect(validEmail('user@.example.com')).to.be.false; // Leading dot in domain
    expect(validEmail('user@com.')).to.be.false; // Trailing dot in domain
  });

  it('should handle edge case scenarios', () => {
    // Edge cases
    expect(validEmail('')).to.be.false; // Empty string
    expect(validEmail('email@')).to.be.false; // Missing domain
    expect(validEmail('@domain.com')).to.be.false; // Missing local part
    expect(validEmail('email@example@example.com')).to.be.false; // Multiple @ signs
    expect(validEmail('email..email@example.com')).to.be.false; // Double dot in local part
    expect(validEmail('.email@example.com')).to.be.false; // Leading dot in local part expect(validEmail('email.@example.com')).to.be.false; // Trailing dot in local part });
});

describe('validPhone', () => {

  it('should return true for a valid 10-digit phone number', () => {
    expect(validPhone('1234567890')).to.be.true;
  });

  it('should return false for a phone number with less than 10 digits', () => {
    expect(validPhone('123456789')).to.be.false;
  });

  it('should return false for a phone number with more than 10 digits', () => {
    expect(validPhone('12345678901')).to.be.false;
  });

  it('should return false for a phone number with non-digit characters', () => {
    expect(validPhone('1234567a90')).to.be.false;
  });

  it('should return false for a phone number with special characters', () => {
    expect(validPhone('123-456-7890')).to.be.false;
  });

  it('should return false for an empty string', () => {
    expect(validPhone('')).to.be.false;
  });

  it('should return false for null', () => {
    expect(validPhone(null as any)).to.be.false;
  });

  it('should return false for undefined', () => {
    expect(validPhone(undefined as any)).to.be.false;
  });

  it('should return false for a non-string input', () => {
    expect(validPhone(1234567890 as any)).to.be.false;
  });

});
