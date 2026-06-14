---
permalink: /resume.html
title: Resume
layout: Post
content-type: static
---

<style>
  .two-col {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2.5rem;
    margin-top: 1rem;
    align-items: start;
  }
  .sec-head {
    font-size: 0.7rem;
    font-weight: var(--weight-bold);
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--text);
    margin: 0 0 1rem;
    padding-bottom: 0.4rem;
    border-bottom: 1px solid var(--border);
  }
  .two-col > div > .sec-head:not(:first-child) {
    margin-top: 2rem;
  }
  .role, .edu-item {
    margin-bottom: 1.5rem;
  }
  .role-title, .edu-degree {
    font-size: var(--scale-sm);
    font-weight: var(--weight-bold);
    color: var(--title);
  }
  .role-period, .edu-year {
    font-size: var(--scale-xs);
    color: var(--text);
    margin-top: 2px;
    font-style: italic;
  }
  .role-org, .edu-school {
    font-size: var(--scale-xs);
    color: var(--text);
    margin-top: 1px;
  }
  .role-desc {
    font-size: var(--scale-sm);
    color: var(--text);
    margin-top: 6px;
    line-height: 1.65;
  }
  .position {
    margin-top: 1.25rem;
  }
  @media (max-width: 560px) {
    .two-col { grid-template-columns: 1fr; gap: 1rem; }
  }
</style>

<div class="two-col">
  <div>
    <div class="sec-head">Education</div>

    <div class="edu-item">
      <div class="edu-degree">London Business School</div>
      <div class="edu-school">Masters of Business Administration</div>
      <div class="edu-year">Ongoing</div>
    </div>

    <div class="edu-item">
      <div class="edu-degree">West Bengal National University of Juridical Sciences</div>
      <div class="edu-school">B.A. LL.B. (Hons.)</div>
      <div class="edu-year">2019</div>
    </div>

    <div class="edu-item">
      <div class="edu-degree">Delhi Public School, R.K. Puram, New Delhi</div>
      <div class="edu-school">All India Senior School Certificate Examination</div>
      <div class="edu-year">2014</div>
    </div>

    <div class="sec-head">Volunteering</div>

    <div class="role">
      <div class="role-title">[Organisation name]</div>
      <div class="role-org">[Position or role]</div>
      <div class="role-period">2023 - Present</div>
    </div>

    <div class="role">
      <div class="role-title">[Organisation name]</div>
      <div class="role-org">[Position or role]</div>
      <div class="role-period">2021 - 2024</div>
    </div>

    <div class="role">
      <div class="role-title">[Organisation name]</div>
      <div class="role-org">[Position or role]</div>
      <div class="role-period">2020 - 2022</div>
    </div>

    <div class="role">
      <div class="role-title">[Organisation name]</div>
      <div class="role-org">[Position or role]</div>
      <div class="role-period">2019 - 2021</div>
    </div>

    <div class="role">
      <div class="role-title">[Organisation name]</div>
      <div class="role-org">[Position or role]</div>
      <div class="role-period">2017 - 2019</div>
    </div>
  </div>

  <div>
    <div class="sec-head">Experience</div>

    <div class="role">
      <div class="role-title">The World Bank Group</div>
      <div class="role-org">PPP Consultant</div>
      <div class="role-period">Dec 2024 - Present</div>
      <div class="role-desc">I help the Bank's Education and Skills Practice structure and negotiate the PPP aspects of their loans in the South Asian Region.</div>
    </div>

    <div class="role">
      <div class="role-title">Trilegal</div>

      <div class="position">
        <div class="role-org">Secondee Lawyer, O2 Power</div>
        <div class="role-period">May 2024 - Aug 2024</div>
        <div class="role-desc">I was seconded to a key client to support them during their fundraise. During my time there, I collaborated with and advised the in-house legal team on regulatory, contractual, and compliance issues.</div>
      </div>

      <div class="position">
        <div class="role-org">Senior Associate, Energy and Infrastructure</div>
        <div class="role-period">Apr 2023 - Aug 2024</div>
        <div class="role-desc">As a senior member of the team, in addition to my duties as an associate, I had a larger role in the firm's recruitment, retention and training initiatives and was also a key contributor to overall team strategy, management and direction. My role as a lawyer also became more supervisory.</div>
      </div>

      <div class="position">
        <div class="role-org">Associate, Energy and Infrastructure</div>
        <div class="role-period">Dec 2020 - Mar 2023</div>
        <div class="role-desc">As part of the Energy and Infrastructure practice group, my responsibilities included: (i) drafting, reviewing, and negotiating concession agreements, power purchase agreements, engineering, procurement, and construction contracts, and operation and maintenance agreements; (ii) carrying out due diligence on companies in the energy and infrastructure sectors; and (iii) advising clients on compliance with sectoral laws and policies.</div>
      </div>

      <div class="position">
        <div class="role-org">Associate, Dispute Resolution</div>
        <div class="role-period">Jun 2019 - Nov 2020</div>
        <div class="role-desc">My role in the Dispute Resolution practice group saw me acting on a variety of contentious and non-contentious mandates for clients in the energy and infrastructure sectors, including representing them in proceedings before courts, arbitral tribunals, and regulatory bodies.</div>
      </div>
    </div>
  </div>
</div>