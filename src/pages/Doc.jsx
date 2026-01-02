import React from 'react';
import JoinWaitListButton from "../components/JoinWaitListButton";

const Docs = () => {
  return (
    <div className="docs">
      <h2>Wazi Documentation</h2>

      <section>
        <h3>What is Wazi?</h3>
        <p>
          Wazi is an all-in-one school discipline and management system
          built to help schools track incidents, manage students,
          and improve accountability.
        </p>
      </section>

      <section>
        <h3>Core Features</h3>
        <ul>
          <li>Student & teacher management</li>
          <li>Incident & discipline tracking</li>
          <li>Role-based dashboards</li>
          <li>Audit logs & accountability</li>
        </ul>
      </section>

      <section>
        <h3>Who is it for?</h3>
        <ul>
          <li>School administrators</li>
          <li>Teachers</li>
          <li>Education institutions</li>
        </ul>
      </section>

      <JoinWaitListButton />
    </div>
  );
};

export default Docs;