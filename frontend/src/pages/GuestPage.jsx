import React from 'react';
import heroImage from '../assets/hero.png';

const GuestPage = () => {
  const stats = [
    { value: '35K+', label: 'Expenses tracked', icon: '$' },
    { value: '12 categories', label: 'Smart budgets', icon: '%' },
    { value: '4.9/5', label: 'User satisfaction', icon: '★' },
  ];

  return (
    <main className="guest-landing">
      <section className="guest-hero">
        <div className="guest-hero-content">
          <span className="guest-badge">Expense Tracker</span>
          <h1 className="guest-title">Know your spending. Save more with confidence.</h1>
          <p className="guest-description">
            A clean budgeting dashboard for fast expense entry, category insights, and better financial habits.
          </p>

          <div className="guest-actions">
            <a href="/login" className="guest-button guest-button-primary">
              Login
            </a>
            <a href="/signup" className="guest-button guest-button-secondary">
              Sign Up
            </a>
          </div>

          <div className="guest-stats">
            {stats.map((item, index) => (
              <div key={index} className="guest-stat-card">
                <span className="guest-stat-icon">{item.icon}</span>
                <div>
                  <p className="guest-stat-value">{item.value}</p>
                  <p className="guest-stat-label">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="guest-hero-visual">
          <div className="guest-visual-card">
            <img src={heroImage} alt="Expense Tracker preview" className="guest-visual-image" />
          </div>
        </div>
      </section>

      <section className="guest-features">
        <div className="guest-section-heading">
          <p className="guest-section-label">Designed for smoother money control</p>
          <h2 className="guest-section-title">Everything you need to track expenses and stay on top of your budget.</h2>
        </div>

        <div className="guest-feature-grid">
          <article className="guest-feature-card">
            <h3>Fast Expense Entry</h3>
            <p>Log expenses in seconds and see your totals update instantly.</p>
          </article>
          <article className="guest-feature-card">
            <h3>Category Insights</h3>
            <p>Visualize spending across categories and make smarter choices.</p>
          </article>
          <article className="guest-feature-card">
            <h3>Monthly Reports</h3>
            <p>Review trends with clean, easy-to-read summaries.</p>
          </article>
        </div>
      </section>
    </main>
  );
};

export default GuestPage;
