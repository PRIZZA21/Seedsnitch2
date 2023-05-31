import React, { useEffect } from 'react'

const FAQ = () => {

    useEffect(() => {
        document.title = 'FAQ | Seedsnitch';
    }, []);

  return (
    <div>
   

    <section id="faq">
      <div
        className="mt-20 mx-auto faq-body gap-x-8 h-[auto] flex flex-col items-center justify-center px-4 md:px-0 md:gap-x-16 w-full pb-12"
      >
        <img
          src="../img/faq.jpg"
          id="faq-image"
          className="md:pt-12 min-w-200px"
          alt=""
        />

        <div className="container">
          
          <details className="faq-card">
            <summary>
              Is there a deadline to apply?
              <span className="faq-open-icon ml-2">+</span>
            </summary>
            <span className="faq-card-spoiler">
              We do not have a specific deadline to apply, and we accept
              applications throughout the year. This means that you can apply at
              any time that is convenient for you.</span
            >
          </details>

          <details className="faq-card">
            <summary>
              What are the eligibility criteria for applying?
              <span className="faq-open-icon">+</span>
            </summary>
            <span className="faq-card-spoiler">
              To apply, one must be a college student and have a startup idea.
              This is the fundamental criterion by which we evaluate
              applications. However, it's worth noting that the idea does not
              need to be fully formed, it can be in the ideation stage as
              well.</span
            >
          </details>
          <details className="faq-card">
            <summary>
              What's the selection ratio for the application?
              <span className="faq-open-icon">+</span>
            </summary>
            <span className="faq-card-spoiler"
              >Our selection ratio is quite high, implying that if there is
              potential in all the ideas , we are ready to fund all of them. Our
              belief in the power of good ideas is stern, and we want to support
              as many of them as possible.</span
            >
          </details>
          <details className="faq-card">
            <summary>
              I am in the ideation stage with no product. Can I still
              apply?<span className="faq-open-icon">+</span>
            </summary>
            <span className="faq-card-spoiler"
              >Yes, you can still apply even if you are in the ideation stage
              and don't have a product yet. We understand that not every idea is
              fully formed at the time of application and that's okay. We are
              here to support you and help you bring your idea to life.</span
            >
          </details>
          <details className="faq-card">
            <summary>
              Will lack of business experience affect my application
              shortlisting? <span className="faq-open-icon">+</span>
            </summary>
            <span className="faq-card-spoiler"
              >No, having no background in running a business will not affect
              your application for shortlisting. We believe that the passion and
              drive to start a business are more important than any degree or
              business background. Every application is treated equally, and we
              take all factors into consideration when evaluating them.</span
            >
          </details>
          {/* <details className="faq-card">
            <summary>
              What is the cohort program run by Seedsnitch, and do you take any
              cohort fees?<span className="faq-open-icon">+</span>
            </summary>
            <span className="faq-card-spoiler"
              >The cohort program is offered 2-3 times per year and is
              completely free for participants. All the selected applications
              are part of the cohort. We believe that providing free Communitys
              and support is the best way to help founders succeed</span
            >
          </details> */}

          <h2 className="faq-heading">Still have questions?</h2>
          <p className="faq-aftertext">
            If you cannot find an answer to your question in our FAQ, you can always<br />
            contact us. We will answer shortly!
          </p>
        </div>
      </div>
    </section>
    
  </div>
  )
}

export default FAQ
