# Security Policy

## 🔒 Our Commitment to Security

At Expertly, cybersecurity is not just our business—it's our core value. We take the security of our website and infrastructure seriously and appreciate the security research community's efforts in helping us maintain the highest security standards.

## 📋 Supported Versions

We currently support security updates for the following:

| Version | Supported          |
| ------- | ------------------ |
| Latest (main branch) | ✅ |
| Staging deployments  | ✅ |
| Older releases | ❌ |

## 🚨 Reporting a Vulnerability

If you discover a security vulnerability in this repository, we encourage responsible disclosure. Please follow these steps:

### How to Report

**DO NOT** open a public GitHub issue for security vulnerabilities.

Instead, please report security issues via one of these channels:

1. **Email**: Send details to `help@expertly.co.in`
2. **Subject Line**: `[SECURITY] Brief description of the issue`

### What to Include

Please provide the following information in your report:

- **Description**: Clear description of the vulnerability
- **Impact**: Potential impact and severity assessment
- **Steps to Reproduce**: Detailed steps to reproduce the issue
- **Proof of Concept**: Code, screenshots, or videos demonstrating the vulnerability
- **Affected Components**: Specific files, endpoints, or features affected
- **Suggested Fix**: If you have recommendations (optional but appreciated)
- **Your Contact Information**: For follow-up questions

### Example Report Template

```
Subject: [SECURITY] XSS vulnerability in blog comment form

Description:
A reflected XSS vulnerability exists in the blog comment submission form.

Impact:
An attacker could execute arbitrary JavaScript in the context of other users' browsers.

Steps to Reproduce:
1. Navigate to /blog/posts/example.html
2. Submit a comment with payload: <script>alert('XSS')</script>
3. Observe script execution

Affected Component:
- File: src/blog/posts/*.html
- Function: Comment submission handler

Contact:
researcher@example.com
```

## ⏱️ Response Timeline

We are committed to addressing security issues promptly:

| Timeline | Action |
|----------|--------|
| **24 hours** | Initial acknowledgment of your report |
| **72 hours** | Preliminary assessment and severity classification |
| **7 days** | Status update on investigation and planned fix |
| **30 days** | Target resolution for critical vulnerabilities |
| **90 days** | Target resolution for non-critical vulnerabilities |

## 🎯 Scope

### In Scope

The following are within the scope of our security policy:

#### Infrastructure & Deployment
- ✅ AWS S3 bucket misconfigurations
- ✅ CloudFront security headers and configurations
- ✅ GitHub Actions workflow vulnerabilities
- ✅ Secrets exposure in the repository
- ✅ CI/CD pipeline security issues

#### Web Application Security
- ✅ Cross-Site Scripting (XSS)
- ✅ Cross-Site Request Forgery (CSRF)
- ✅ Content injection vulnerabilities
- ✅ Insecure direct object references
- ✅ Authentication and authorisation bypass
- ✅ Security misconfiguration
- ✅ Information disclosure

#### Third-Party Dependencies
- ✅ Vulnerabilities in npm packages
- ✅ Outdated or vulnerable libraries
- ✅ Supply chain security issues

#### Client-Side Security
- ✅ JavaScript security issues
- ✅ Insecure data storage (localStorage, sessionStorage)
- ✅ Client-side validation bypass

### Out of Scope

The following are **not** considered vulnerabilities:

- ❌ Denial of Service (DoS/DDoS) attacks
- ❌ Social engineering attacks against Expertly employees
- ❌ Physical security issues
- ❌ Reports from automated tools without validation
- ❌ Issues that require physical access to a user's device
- ❌ Issues already known and tracked
- ❌ Best practice recommendations without demonstrated security impact
- ❌ Vulnerabilities in outdated/unsupported versions
- ❌ Missing security headers without demonstrated exploitation
- ❌ Clickjacking on pages without sensitive actions
- ❌ Reports of software versions without a known vulnerability

## 🏆 Recognition

We believe in recognising security researchers who help us improve our security:

### Hall of Fame

We maintain a Security Researchers Hall of Fame for individuals who responsibly disclose valid security issues. With your permission, we will:

- List your name (or alias) in our security acknowledgements
- Credit you in the release notes when the fix is deployed
- Provide a testimonial for your responsible disclosure (upon request)

### Bug Bounty Program

Currently, we do not offer a paid bug bounty program. However, we:
- Deeply appreciate responsible disclosure
- May offer swag or recognition on a case-by-case basis
- Reserve the right to provide rewards for exceptional findings

## 📜 Responsible Disclosure Policy

### Our Commitments

We commit to:

1. **Acknowledge** your report within 24 hours
2. **Investigate** thoroughly and keep you informed
3. **Fix** verified vulnerabilities promptly
4. **Credit** you for your discovery (with your permission)
5. **Not pursue legal action** against researchers who follow these guidelines

### Your Responsibilities

We ask that you:

1. **Give us a reasonable time** to fix the issue before public disclosure
2. **Do not exploit** the vulnerability beyond what's necessary to demonstrate it
3. **Avoid privacy violations**, data destruction, or service disruption
4. **Do not access** or modify other users' data
5. **Follow** responsible disclosure practices
6. **Maintain confidentiality** until we've resolved the issue and agreed on disclosure

### Safe Harbour

We consider security research conducted in accordance with this policy to be:

- Authorised concerning the Computer Fraud and Abuse Act
- Exempt from DMCA restrictions
- Lawful and beneficial to the overall security of the internet
- Valuable contribution to our security

We will not pursue legal action against researchers who discover and report vulnerabilities in accordance with this policy.

## 🔐 Security Best Practices

We follow these security practices in our development:

### Code Security
- Regular dependency updates and vulnerability scanning
- Security reviews for all code changes
- Principle of least privilege in AWS IAM policies
- Secrets management via GitHub Secrets (never committed to the repository)

### Infrastructure Security
- HTTPS-only with strong TLS configurations
- Content Security Policy (CSP) headers
- Secure CloudFront configurations
- Regular security audits of AWS infrastructure

### Deployment Security
- Automated deployments via GitHub Actions
- Manual approval gates for production deployments
- Staging environment testing before production
- CloudFront cache invalidation to prevent stale content

## 📞 Contact

For security inquiries specifically:
- **Email**: security@expertly.co.in
- **General Contact**: info@expertly.co.in

For general questions about Expertly:
- **Website**: https://expertly.co.in
- **Blog**: https://expertly.co.in/blog/

## 📚 Additional Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [CWE Top 25](https://cwe.mitre.org/top25/)
- [AWS Security Best Practices](https://aws.amazon.com/security/best-practices/)

## 🔄 Policy Updates

This security policy may be updated from time to time. The latest version will always be available in this repository.

**Last Updated**: January 2025

---

**Thank you** for helping keep Expertly and our users safe! 🙏

We're committed to working with security researchers to verify, reproduce, and respond to legitimate reported vulnerabilities. Together, we can maintain the highest security standards in fintech cybersecurity.
