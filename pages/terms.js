import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  termsWrapper: {
    width: "80%",
    [theme.breakpoints.down("md")]: {
      width: "90%",
    },
  },
  title: {
    [theme.breakpoints.down("md")]: {
      fontSize: "4em",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "2.5em",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.5em",
    },
  },
  subTitle: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.5em",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "1em",
      lineHeight: 1,
    },
  },
  textWrapper: {
    marginTop: "1.5em",
  },
  text: {
    [theme.breakpoints.down("md")]: {
      fontSize: "1.2em",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "1em",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.9em",
    },
  },
}));

const Terms = () => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Grid container alignItems={"center"} direction={"column"}>
      <Grid
        item
        container
        direction={"column"}
        alignItems={"center"}
        className={classes.termsWrapper}
      >
        <Grid item>
          <Typography variant={"h1"} className={classes.title}>
            Terms & Conditions
          </Typography>
        </Grid>

        <Grid item container direction={"column"}>
          <Grid item className={classes.textWrapper}>
            <Typography variant={"body1"} className={classes.text}>
              Last updated July 15, 2020
            </Typography>
          </Grid>

          {/*1.   Agreement to Terms*/}
          <Grid item className={classes.textWrapper}>
            <Typography variant={"h6"} className={classes.subTitle}>
              1. Agreement to Terms
            </Typography>
          </Grid>
          <Grid item className={classes.textWrapper}>
            <Typography variant={"body1"} className={classes.text}>
              1.1 These Terms and Conditions constitute a legally binding
              agreement made between you, whether personally or on behalf of an
              entity (you), and DougiesGuide, located at 10581 EL CERRITO CHICO
              STREET, Las Vegas, NV 89179 United States (we, us), concerning your
              access to and use of the Dougiesguide (https://dougiesguide.com)
              website as well as any related applications (the Site).
            </Typography>
          </Grid>
          <Grid item className={classes.textWrapper}>
            <Typography variant={"body1"} className={classes.text}>
              The Site provides the following services: Online dive bar and
              restaurant finder (Services). You agree that by accessing the Site
              and/or Services, you have read, understood, and agree to be bound by
              all of these Terms and Conditions.
            </Typography>
          </Grid>
          <Grid item className={classes.textWrapper}>
            <Typography variant={"body1"} className={classes.text}>
              If you do not agree with all of these Terms and Conditions, then you
              are prohibited from using the Site and Services and you must
              discontinue use immediately. We recommend that you print a copy of
              these Terms and Conditions for future reference.
            </Typography>
          </Grid>
          <Grid item className={classes.textWrapper}>
            <Typography variant={"body1"} className={classes.text}>
              1.2 The supplemental policies set out in Section 1.7 below, as well
              as any supplemental terms and condition or documents that may be
              posted on the Site from time to time, are expressly incorporated by
              reference.
            </Typography>
          </Grid>
          <Grid item className={classes.textWrapper}>
            <Typography variant={"body1"} className={classes.text}>
              1.3 We may make changes to these Terms and Conditions at any time.
              The updated version of these Terms and Conditions will be indicated
              by an updated “Revised” date and the updated version will be
              effective as soon as it is accessible. You are responsible for
              reviewing these Terms and Conditions to stay informed of updates.
              Your continued use of the Site represents that you have accepted
              such changes.
            </Typography>
          </Grid>
          <Grid item className={classes.textWrapper}>
            <Typography variant={"body1"} className={classes.text}>
              1.4 We may update or change the Site from time to time to reflect
              changes to our products, our users' needs and/or our business
              priorities.
            </Typography>
          </Grid>
          <Grid item className={classes.textWrapper}>
            <Typography variant={"body1"} className={classes.text}>
              1.5 Our site is directed to people residing in United Kingdom. The
              information provided on the Site is not intended for distribution to
              or use by any person or entity in any jurisdiction or country where
              such distribution or use would be contrary to law or regulation or
              which would subject us to any registration requirement within such
              jurisdiction or country.
            </Typography>
          </Grid>
          <Grid item className={classes.textWrapper}>
            <Typography variant={"body1"} className={classes.text}>
              1.6 The Site is intended for users who are at least 18 years old. If
              you are under the age of 18, you are not permitted to register for
              the Site or use the Services without parental permission.
            </Typography>
          </Grid>
          <Grid item className={classes.textWrapper}>
            <Typography variant={"body1"} className={classes.text}>
              1.7 Additional policies which also apply to your use of the Site
              include:
            </Typography>
          </Grid>

          <Grid item className={classes.textWrapper}>
            <Typography
                variant={"body1"}
                className={classes.text}
                style={{ paddingLeft: "2em" }}
            >
              Our Privacy Notice{" "}
              <a href="https://dougiesguide.com/privacy">
                https://dougiesguide.com/privacy
              </a>
              , which sets out the terms on which we process any personal data we
              collect from you, or that you provide to us. By using the Site, you
              consent to such processing and you warrant that all data provided by
              you is accurate.
            </Typography>
          </Grid>

          {/*2.    Acceptable Use*/}

          <Grid item className={classes.textWrapper}>
            <Typography variant={"h6"} className={classes.subTitle}>
              2. Acceptable Use
            </Typography>
          </Grid>

          <Grid item className={classes.textWrapper}>
            <Typography variant={"body1"} className={classes.text}>
              2.1 You may not access or use the Site for any purpose other than
              that for which we make the site and our services available. The Site
              may not be used in connection with any commercial endeavors except
              those that are specifically endorsed or approved by us.
            </Typography>
          </Grid>
          <Grid item className={classes.textWrapper}>
            <Typography variant={"body1"} className={classes.text}>
              2.2 As a user of this Site, you agree not to:
            </Typography>
          </Grid>

          <Grid item className={classes.textWrapper}>
            <Typography
                variant={"body1"}
                className={classes.text}
                style={{ paddingLeft: "2em" }}
            >
              Systematically retrieve data or other content from the Site to a
              compile database or directory without written permission from us
            </Typography>
          </Grid>
          <Grid item className={classes.textWrapper}>
            <Typography
                variant={"body1"}
                className={classes.text}
                style={{ paddingLeft: "2em" }}
            >
              Make any unauthorized use of the Site, including collecting
              usernames and/or email addresses of users to send unsolicited email
              or creating user accounts under false pretenses
            </Typography>
          </Grid>
          <Grid item className={classes.textWrapper}>
            <Typography
                variant={"body1"}
                className={classes.text}
                style={{ paddingLeft: "2em" }}
            >
              Use a buying agent or purchasing agent to make purchases on the Site
            </Typography>
          </Grid>
          <Grid item className={classes.textWrapper}>
            <Typography
                variant={"body1"}
                className={classes.text}
                style={{ paddingLeft: "2em" }}
            >
              Use the Site to advertise or sell goods and services
            </Typography>
          </Grid>

          <Grid item className={classes.textWrapper}>
            <Typography
                variant={"body1"}
                className={classes.text}
                style={{ paddingLeft: "2em" }}
            >
              Circumvent, disable, or otherwise interfere with security-related
              features of the Site, including features that prevent or restrict
              the use or copying of any content or enforce limitations on the use
            </Typography>
          </Grid>
          <Grid item className={classes.textWrapper}>
            <Typography
                variant={"body1"}
                className={classes.text}
                style={{ paddingLeft: "2em" }}
            >
              Engage in unauthorized framing of or linking to the Site
            </Typography>
          </Grid>
          <Grid item className={classes.textWrapper}>
            <Typography
                variant={"body1"}
                className={classes.text}
                style={{ paddingLeft: "2em" }}
            >
              Trick, defraud, or mislead us and other users, especially in any
              attempt to learn sensitive account information such as user
              passwords
            </Typography>
          </Grid>
          <Grid item className={classes.textWrapper}>
            <Typography
                variant={"body1"}
                className={classes.text}
                style={{ paddingLeft: "2em" }}
            >
              Make improper use of our support services, or submit false reports
              of abuse or misconduct
            </Typography>
          </Grid>
          <Grid item className={classes.textWrapper}>
            <Typography
                variant={"body1"}
                className={classes.text}
                style={{ paddingLeft: "2em" }}
            >
              Engage in any automated use of the system, such as using scripts to
              send comments or messages, or using any data mining, robots, or
              similar data gathering and extraction tools
            </Typography>
          </Grid>
          <Grid item className={classes.textWrapper}>
            <Typography
                variant={"body1"}
                className={classes.text}
                style={{ paddingLeft: "2em" }}
            >
              Interfere with, disrupt, or create an undue burden on the Site or
              the networks and services connected to the Site
            </Typography>
          </Grid>
          <Grid item className={classes.textWrapper}>
            <Typography
                variant={"body1"}
                className={classes.text}
                style={{ paddingLeft: "2em" }}
            >
              Attempt to impersonate another user or person, or use the username
              of another user
            </Typography>
          </Grid>
          <Grid item className={classes.textWrapper}>
            <Typography
                variant={"body1"}
                className={classes.text}
                style={{ paddingLeft: "2em" }}
            >
              Sell or otherwise transfer your profile
            </Typography>
          </Grid>
          <Grid item className={classes.textWrapper}>
            <Typography
                variant={"body1"}
                className={classes.text}
                style={{ paddingLeft: "2em" }}
            >
              Use any information obtained from the Site in order to harass,
              abuse, or harm another person
            </Typography>
          </Grid>
          <Grid item className={classes.textWrapper}>
            <Typography
                variant={"body1"}
                className={classes.text}
                style={{ paddingLeft: "2em" }}
            >
              Use the Site or our content as part of any effort to compete with us
              or to create a revenue-generating endeavor or commercial enterprise
            </Typography>
          </Grid>
          <Grid item className={classes.textWrapper}>
            <Typography
                variant={"body1"}
                className={classes.text}
                style={{ paddingLeft: "2em" }}
            >
              Decipher, decompile, disassemble, or reverse engineer any of the
              software comprising or in any way making up a part of the Site
            </Typography>
          </Grid>
          <Grid item className={classes.textWrapper}>
            <Typography
                variant={"body1"}
                className={classes.text}
                style={{ paddingLeft: "2em" }}
            >
              Attempt to access any portions of the Site that you are restricted
              from accessing
            </Typography>
          </Grid>
          <Grid item className={classes.textWrapper}>
            <Typography
                variant={"body1"}
                className={classes.text}
                style={{ paddingLeft: "2em" }}
            >
              Harass, annoy, intimidate, or threaten any of our employees, agents,
              or other users
            </Typography>
          </Grid>
          <Grid item className={classes.textWrapper}>
            <Typography
                variant={"body1"}
                className={classes.text}
                style={{ paddingLeft: "2em" }}
            >
              Delete the copyright or other proprietary rights notice from any of
              the content
            </Typography>
          </Grid>
          <Grid item className={classes.textWrapper}>
            <Typography
                variant={"body1"}
                className={classes.text}
                style={{ paddingLeft: "2em" }}
            >
              Copy or adapt the Site’s software, including but not limited to
              Flash, PHP, HTML, JavaScript, or other code
            </Typography>
          </Grid>
          <Grid item className={classes.textWrapper}>
            <Typography
                variant={"body1"}
                className={classes.text}
                style={{ paddingLeft: "2em" }}
            >
              Upload or transmit (or attempt to upload or to transmit) viruses,
              Trojan horses, or other material that interferes with any party’s
              uninterrupted use and enjoyment of the Site, or any material that
              acts as a passive or active information collection or transmission
              mechanism
            </Typography>
          </Grid>
          <Grid item className={classes.textWrapper}>
            <Typography
                variant={"body1"}
                className={classes.text}
                style={{ paddingLeft: "2em" }}
            >
              Use, launch, or engage in any automated use of the system, such as
              using scripts to send comments or messages, robots, scrapers,
              offline readers, or similar data gathering and extraction tools
            </Typography>
          </Grid>
          <Grid item className={classes.textWrapper}>
            <Typography
                variant={"body1"}
                className={classes.text}
                style={{ paddingLeft: "2em" }}
            >
              Disparage, tarnish, or otherwise harm, in our opinion, us and/or the
              Site
            </Typography>
          </Grid>
          <Grid item className={classes.textWrapper}>
            <Typography
                variant={"body1"}
                className={classes.text}
                style={{ paddingLeft: "2em" }}
            >
              Use the Site in a manner inconsistent with any applicable laws or
              regulations
            </Typography>
          </Grid>
          <Grid item className={classes.textWrapper}>
            <Typography
                variant={"body1"}
                className={classes.text}
                style={{ paddingLeft: "2em" }}
            >
              Threaten users with negative feedback or offering services solely to
              give positive feedback to users
            </Typography>
          </Grid>
          <Grid item className={classes.textWrapper}>
            <Typography
                variant={"body1"}
                className={classes.text}
                style={{ paddingLeft: "2em" }}
            >
              Misrepresent experience, skills, or information about a User
            </Typography>
          </Grid>
          <Grid item className={classes.textWrapper}>
            <Typography
                variant={"body1"}
                className={classes.text}
                style={{ paddingLeft: "2em" }}
            >
              Advertise products or services not intended by us
            </Typography>
          </Grid>
          <Grid item className={classes.textWrapper}>
            <Typography
                variant={"body1"}
                className={classes.text}
                style={{ paddingLeft: "2em" }}
            >
              Falsely imply a relationship with us or another company with whom
              you do not have a relationship
            </Typography>
          </Grid>

          {/*3.   Information you provide to us*/}
          <Grid item className={classes.textWrapper}>
            <Typography variant={"h6"} className={classes.subTitle}>
              3. Information you provide to us
            </Typography>
          </Grid>

          <Grid item className={classes.textWrapper}>
            <Typography variant={"body1"} className={classes.text}>
              3.1 You represent and warrant that: (a) all registration information
              you submit will be true, accurate, current, and complete and relate
              to you and not a third party; (b) you will maintain the accuracy of
              such information and promptly update such information as necessary;
              (c) you will keep your password confidential and will be responsible
              for all use of your password and account; (d) you have the legal
              capacity and you agree to comply with these Terms and Conditions;
              and (e) you are not a minor in the jurisdiction in which you reside,
              or if a minor, you have received parental permission to use the
              Site.
            </Typography>
          </Grid>
          <Grid item className={classes.textWrapper}>
            <Typography variant={"body1"} className={classes.text}>
              If you know or suspect that anyone other than you knows your user
              information (such as an identification code or user name) and/or
              password you must promptly notify us at dougiesguide@gmail.com.
            </Typography>
          </Grid>
          <Grid item className={classes.textWrapper}>
            <Typography variant={"body1"} className={classes.text}>
              3.2 If you provide any information that is untrue, inaccurate, not
              current or incomplete, we may suspend or terminate your account. We
              may remove or change a user name you select if we determine that
              such user name is inappropriate.
            </Typography>
          </Grid>
          <Grid item className={classes.textWrapper}>
            <Typography variant={"body1"} className={classes.text}>
              3.3 As part of the functionality of the Site, you may link your
              account with online accounts you may have with third party service
              providers (each such account, a Third Party Account) by either: (a)
              providing your Third Party Account login information through the
              Site; or (b) allowing us to access your Third Party Account, as is
              permitted under the applicable terms and conditions that govern your
              use of each Third Party Account.
            </Typography>
          </Grid>
          <Grid item className={classes.textWrapper}>
            <Typography variant={"body1"} className={classes.text}>
              You represent that you are entitled to disclose your Third Party
              Account login information to us and/or grant us access to your Third
              Party Account without breach by you of any of the terms and
              conditions that govern your use of the applicable Third Party
              Account and without obligating us to pay any fees or making us
              subject to any usage limitations imposed by such third party service
              providers.
            </Typography>
          </Grid>
          <Grid item className={classes.textWrapper}>
            <Typography variant={"body1"} className={classes.text}>
              3.4 By granting us access to any Third Party Accounts, you
              understand that (a) we may access, make available and store (if
              applicable) any content that you have provided to and stored in your
              Third Party Account (the “Social Network Content”) so that it is
              available on and through the Site via your account, including
              without limitation any friend lists; and (b) we may submit and
              receive additional information to your Third Party Account to the
              extent you are notified when you link your account with the Third
              Party Account.
            </Typography>
          </Grid>
          <Grid item className={classes.textWrapper}>
            <Typography variant={"body1"} className={classes.text}>
              Depending on the Third Party Accounts you choose and subject to the
              privacy settings that you have set in such Third Party Accounts,
              personally identifiable information that you post to your Third
              Party Accounts may be available on and through your account on the
              Site. Please note that if a Third Party Account or associated
              service becomes unavailable or our access to such Third Party
              Account is terminated by the third party service provider, then
              Social Network Content may no longer be available on and through the
              Site.
            </Typography>
          </Grid>
          <Grid item className={classes.textWrapper}>
            <Typography variant={"body1"} className={classes.text}>
              You will have the ability to disable the connection between your
              account on the Site and your Third Party Accounts at any time.
              Please note that your relationship with the third party service
              providers associated with your third party accounts is governed
              solely by your agreement(s) with such third party service providers.
              We make no effort to review any Social Network Content for any
              purpose, including but not limited to, for accuracy, legality or
              non-infringement, and we are not responsible for any Social Network
              Content.
            </Typography>
          </Grid>
          <Grid item className={classes.textWrapper}>
            <Typography variant={"body1"} className={classes.text}>
              You acknowledge and agree that we may access your email address book
              associated with a Third Party Account and your contacts list stored
              on your mobile device or tablet computer solely for purposes of
              identifying and informing you of those contacts who have also
              registered to use the Site. At your email request to
              dougiesguide@gmail.com or through your account settings (if
              applicable), we will deactivate the connection between the Site and
              your Third Party Account and attempt to delete any information
              stored on our servers that was obtained through such Third Party
              Account, except the username and profile picture that became
              associated with your account.
            </Typography>
          </Grid>

          {/*4.    Content you provide to us*/}
          <Grid item className={classes.textWrapper}>
            <Typography variant={"h6"} className={classes.subTitle}>
              4. Content you provide to us
            </Typography>
          </Grid>

          <Grid item className={classes.textWrapper}>
            <Typography variant={"body1"} className={classes.text}></Typography>
          </Grid>
          <Grid item className={classes.textWrapper}>
            <Typography variant={"body1"} className={classes.text}>
              4.1 There may be opportunities for you to post content to the Site
              or send feedback to us (User Content). You understand and agree that
              your User Content may be viewed by other users on the Site, and that
              they may be able to see who has posted that User Content.
            </Typography>
          </Grid>
          <Grid item className={classes.textWrapper}>
            <Typography variant={"body1"} className={classes.text}>
              4.2 In posting User Content, including reviews or making contact
              with other users of the Site you shall comply with our Acceptable
              Use Policy __________.
            </Typography>
          </Grid>
          <Grid item className={classes.textWrapper}>
            <Typography variant={"body1"} className={classes.text}>
              4.3 You warrant that any User Content does comply with our
              Acceptable Use Policy, and you will be liable to us and indemnify us
              for any breach of that warranty. This means you will be responsible
              for any loss or damage we suffer as a result of your breach of this
              warranty.
            </Typography>
          </Grid>
          <Grid item className={classes.textWrapper}>
            <Typography variant={"body1"} className={classes.text}>
              4.4 We have the right to remove any User Content you put on the Site
              if, in our opinion, such User Content does not comply with the
              Acceptable Use Policy.
            </Typography>
          </Grid>
          <Grid item className={classes.textWrapper}>
            <Typography variant={"body1"} className={classes.text}>
              4.5 We are not responsible and accept no liability for any User
              Content including any such content that contains incorrect
              information or is defamatory or loss of User Content. We accept no
              obligation to screen, edit or monitor any User Content but we
              reserve the right to remove, screen and/or edit any User Content
              without notice and at any time. User Content has not been verified
              or approved by us and the views expressed by other users on the Site
              do not represent our views or values
            </Typography>
          </Grid>
          <Grid item className={classes.textWrapper}>
            <Typography variant={"body1"} className={classes.text}>
              4.6 If you wish to complain about User Content uploaded by other
              users please contact us at dougiesguide@gmail.com.
            </Typography>
          </Grid>

          {/*5.   Our content*/}
          <Grid item className={classes.textWrapper}>
            <Typography variant={"h6"} className={classes.subTitle}>
              5. Our content
            </Typography>
          </Grid>

          <Grid item className={classes.textWrapper}>
            <Typography variant={"body1"} className={classes.text}>
              5.1 Unless otherwise indicated, the Site and Services including
              source code, databases, functionality, software, website designs,
              audio, video, text, photographs, and graphics on the Site (Our
              Content) are owned or licensed to us, and are protected by copyright
              and trade mark laws.
            </Typography>
          </Grid>
          <Grid item className={classes.textWrapper}>
            <Typography variant={"body1"} className={classes.text}>
              5.2 Except as expressly provided in these Terms and Conditions, no
              part of the Site, Services or Our Content may be copied, reproduced,
              aggregated, republished, uploaded, posted, publicly displayed,
              encoded, translated, transmitted, distributed, sold, licensed, or
              otherwise exploited for any commercial purpose whatsoever, without
              our express prior written permission.
            </Typography>
          </Grid>
          <Grid item className={classes.textWrapper}>
            <Typography variant={"body1"} className={classes.text}>
              5.3 Provided that you are eligible to use the Site, you are granted
              a limited licence to access and use the Site and Our Content and to
              download or print a copy of any portion of the Content to which you
              have properly gained access solely for your personal, non-commercial
              use.
            </Typography>
          </Grid>
          <Grid item className={classes.textWrapper}>
            <Typography variant={"body1"} className={classes.text}>
              5.4 You shall not (a) try to gain unauthorised access to the Site or
              any networks, servers or computer systems connected to the Site;
              and/or (b) make for any purpose including error correction, any
              modifications, adaptions, additions or enhancements to the Site or
              Our Content, including the modification of the paper or digital
              copies you may have downloaded.
            </Typography>
          </Grid>
          <Grid item className={classes.textWrapper}>
            <Typography variant={"body1"} className={classes.text}>
              5.5 We shall (a) prepare the Site and Our Content with reasonable
              skill and care; and (b) use industry standard virus detection
              software to try to block the uploading of content to the Site that
              contains viruses.
            </Typography>
          </Grid>
          <Grid item className={classes.textWrapper}>
            <Typography variant={"body1"} className={classes.text}>
              5.6 The content on the Site is provided for general information
              only. It is not intended to amount to advice on which you should
              rely. You must obtain professional or specialist advice before
              taking, or refraining from taking, any action on the basis of the
              content on the Site.
            </Typography>
          </Grid>
          <Grid item className={classes.textWrapper}>
            <Typography variant={"body1"} className={classes.text}>
              5.7 Although we make reasonable efforts to update the information on
              our site, we make no representations, warranties or guarantees,
              whether express or implied, that Our Content on the Site is
              accurate, complete or up to date.
            </Typography>
          </Grid>

          {/*6.    Site Management*/}
          <Grid item className={classes.textWrapper}>
            <Typography variant={"h6"} className={classes.subTitle}>
              6. Site Management
            </Typography>
          </Grid>

          <Grid item className={classes.textWrapper}>
            <Typography variant={"body1"} className={classes.text}>
              6.1 We reserve the right at our sole discretion, to (1) monitor the
              Site for breaches of these Terms and Conditions; (2) take
              appropriate legal action against anyone in breach of applicable laws
              or these Terms and Conditions; (3) refuse, restrict access to or
              availability of, or disable (to the extent technologically feasible)
              any of your Contributions; (4) remove from the Site or otherwise
              disable all files and content that are excessive in size or are in
              any way a burden to our systems; and (5) otherwise manage the Site
              in a manner designed to protect our rights and property and to
              facilitate the proper functioning of the Site and Services.
            </Typography>
          </Grid>
          <Grid item className={classes.textWrapper}>
            <Typography variant={"body1"} className={classes.text}>
              6.2 We do not guarantee that the Site will be secure or free from
              bugs or viruses.
            </Typography>
          </Grid>
          <Grid item className={classes.textWrapper}>
            <Typography variant={"body1"} className={classes.text}>
              6.3 You are responsible for configuring your information technology,
              computer programs and platform to access the Site and you should use
              your own virus protection software.
            </Typography>
          </Grid>

          {/*7.    Modifications to and availability of the Site*/}
          <Grid item className={classes.textWrapper}>
            <Typography variant={"h6"} className={classes.subTitle}>
              7. Modifications to and availability of the Site
            </Typography>
          </Grid>

          <Grid item className={classes.textWrapper}>
            <Typography variant={"body1"} className={classes.text}>
              7.1 We reserve the right to change, modify, or remove the contents
              of the Site at any time or for any reason at our sole discretion
              without notice. We also reserve the right to modify or discontinue
              all or part of the Services without notice at any time.
            </Typography>
          </Grid>
          <Grid item className={classes.textWrapper}>
            <Typography variant={"body1"} className={classes.text}>
              7.2 We cannot guarantee the Site and Services will be available at
              all times. We may experience hardware, software, or other problems
              or need to perform maintenance related to the Site, resulting in
              interruptions, delays, or errors. You agree that we have no
              liability whatsoever for any loss, damage, or inconvenience caused
              by your inability to access or use the Site or Services during any
              downtime or discontinuance of the Site or Services.We are not
              obliged to maintain and support the Site or Services or to supply
              any corrections, updates, or releases.
            </Typography>
          </Grid>
          <Grid item className={classes.textWrapper}>
            <Typography variant={"body1"} className={classes.text}>
              7.3 There may be information on the Site that contains typographical
              errors, inaccuracies, or omissions that may relate to the Services,
              including descriptions, pricing, availability, and various other
              information. We reserve the right to correct any errors,
              inaccuracies, or omissions and to change or update the information
              at any time, without prior notice.
            </Typography>
          </Grid>

          {/*8.    Disclaimer/Limitation of Liability*/}
          <Grid item className={classes.textWrapper}>
            <Typography variant={"h6"} className={classes.subTitle}>
              8. Disclaimer/Limitation of Liability
            </Typography>
          </Grid>

          <Grid item className={classes.textWrapper}>
            <Typography variant={"body1"} className={classes.text}>
              8.1 The Site and Services are provided on an as-is and as-available
              basis. You agree that your use of the Site and/or Services will be
              at your sole risk except as expressly set out in these Terms and
              Conditions. All warranties, terms, conditions and undertakings,
              express or implied (including by statute, custom or usage, a course
              of dealing, or common law) in connection with the Site and Services
              and your use thereof including, without limitation, the implied
              warranties of satisfactory quality, fitness for a particular purpose
              and non-infringement are excluded to the fullest extent permitted by
              applicable law.
            </Typography>
          </Grid>
          <Grid item className={classes.textWrapper}>
            <Typography variant={"body1"} className={classes.text}>
              We make no warranties or representations about the accuracy or
              completeness of the Site’s content and are not liable for any (1)
              errors or omissions in content: (2) any unauthorized access to or
              use of our servers and/or any and all personal information and/or
              financial information stored on our server; (3) any interruption or
              cessation of transmission to or from the site or services; and/or
              (4) any bugs, viruses, trojan horses, or the like which may be
              transmitted to or through the site by any third party. We will not
              be responsible for any delay or failure to comply with our
              obligations under these Terms and Conditions if such delay or
              failure is caused by an event beyond our reasonable control.
            </Typography>
          </Grid>
          <Grid item className={classes.textWrapper}>
            <Typography variant={"body1"} className={classes.text}>
              8.2 Our responsibility for loss or damage suffered by you:
            </Typography>
          </Grid>

          <Grid item className={classes.textWrapper}>
            <Typography
                variant={"body1"}
                className={classes.text}
                style={{ fontWeight: 600 }}
            >
              Whether you are a consumer or a business user:
            </Typography>
          </Grid>

          <Grid item className={classes.textWrapper}>
            <Typography
                variant={"body1"}
                className={classes.text}
                style={{ paddingLeft: "2em" }}
            >
              We do not exclude or limit in any way our liability to you where it
              would be unlawful to do so. This includes liability for death or
              personal injury caused by our negligence or the negligence of our
              employees, agents or subcontractors and for fraud or fraudulent
              misrepresentation.
            </Typography>
          </Grid>
          <Grid item className={classes.textWrapper}>
            <Typography
                variant={"body1"}
                className={classes.text}
                style={{ paddingLeft: "2em" }}
            >
              If we fail to comply with these Terms and Conditions, we will be
              responsible for loss or damage you suffer that is a foreseeable
              result of our breach of these Terms and Conditions, but we would not
              be responsible for any loss or damage that were not foreseeable at
              the time you started using the Site/Services.
            </Typography>
          </Grid>
          <Grid item className={classes.textWrapper}>
            <Typography
                variant={"body1"}
                className={classes.text}
                style={{ paddingLeft: "2em" }}
            >
              Notwithstanding anything to the contrary contained in the
              Disclaimer/Limitation of Liability section, our liability to you for
              any cause whatsoever and regardless of the form of the action, will
              at all times be limited to a total aggregate amount equal to the
              greater of (a) the sum of £100 or (b) the amount paid, if any, by
              you to us for the Services/Site during the six (6) month period
              prior to any cause of action arising.
            </Typography>
          </Grid>

          <Grid item className={classes.textWrapper}>
            <Typography
                variant={"body1"}
                className={classes.text}
                style={{ fonrWeight: 600 }}
            >
              If you are a business user:
            </Typography>
          </Grid>

          <Grid item className={classes.textWrapper}>
            <Typography variant={"body1"} className={classes.text}>
              We will not be liable to you for any loss or damage, whether in
              contract, tort (including negligence), breach of statutory duty, or
              otherwise, even if foreseeable, arising under or in connection with:
            </Typography>
          </Grid>
          <Grid item className={classes.textWrapper}>
            <Typography
                variant={"body1"}
                className={classes.text}
                style={{ paddingLeft: "2em" }}
            >
              use of, or inability to use, our Site/Services; or
            </Typography>
          </Grid>
          <Grid item className={classes.textWrapper}>
            <Typography
                variant={"body1"}
                className={classes.text}
                style={{ paddingLeft: "2em" }}
            >
              use of or reliance on any content displayed on our Site.
            </Typography>
          </Grid>
          <Grid item className={classes.textWrapper}>
            <Typography variant={"body1"} className={classes.text}>
              In particular, we will not be liable for:
            </Typography>
          </Grid>
          <Grid item className={classes.textWrapper}>
            <Typography
                variant={"body1"}
                className={classes.text}
                style={{ paddingLeft: "2em" }}
            >
              loss of profits, sales, business, or revenue;
            </Typography>
          </Grid>
          <Grid item className={classes.textWrapper}>
            <Typography
                variant={"body1"}
                className={classes.text}
                style={{ paddingLeft: "2em" }}
            >
              business interruption;
            </Typography>
          </Grid>
          <Grid item className={classes.textWrapper}>
            <Typography
                variant={"body1"}
                className={classes.text}
                style={{ paddingLeft: "2em" }}
            >
              loss of anticipated savings;
            </Typography>
          </Grid>
          <Grid item className={classes.textWrapper}>
            <Typography
                variant={"body1"}
                className={classes.text}
                style={{ paddingLeft: "2em" }}
            >
              loss of business opportunity, goodwill or reputation; or
            </Typography>
          </Grid>
          <Grid item className={classes.textWrapper}>
            <Typography
                variant={"body1"}
                className={classes.text}
                style={{ paddingLeft: "2em" }}
            >
              any indirect or consequential loss or damage.
            </Typography>
          </Grid>

          <Grid item className={classes.textWrapper}>
            <Typography
                variant={"body1"}
                className={classes.text}
                style={{ fontWeight: 600 }}
            >
              If you are a consumer user:
            </Typography>
          </Grid>

          <Grid item className={classes.textWrapper}>
            <Typography
                variant={"body1"}
                className={classes.text}
                style={{ paddingLeft: "2em" }}
            >
              Please note that we only provide our Site for domestic and private
              use. You agree not to use our Site for any commercial or business
              purposes, and we have no liability to you for any loss of profit,
              loss of business, business interruption, or loss of business
              opportunity.
            </Typography>
          </Grid>
          <Grid item className={classes.textWrapper}>
            <Typography
                variant={"body1"}
                className={classes.text}
                style={{ paddingLeft: "2em" }}
            >
              If defective digital content that we have supplied, damages a device
              or digital content belonging to you and this is caused by our
              failure to use reasonable care and skill, we will either repair the
              damage or pay you compensation.
            </Typography>
          </Grid>
          <Grid item className={classes.textWrapper}>
            <Typography
                variant={"body1"}
                className={classes.text}
                style={{ paddingLeft: "2em" }}
            >
              You have legal rights in relation to goods that are faulty or not as
              described. Advice about your legal rights is available from your
              local Citizens' Advice Bureau or Trading Standards office. Nothing
              in these Terms and Conditions will affect these legal rights.
            </Typography>
          </Grid>

          {/*9.    Term and Termination*/}
          <Grid item className={classes.textWrapper}>
            <Typography variant={"h6"} className={classes.subTitle}>
              9. Term and Termination
            </Typography>
          </Grid>

          <Grid item className={classes.textWrapper}>
            <Typography variant={"body1"} className={classes.text}>
              9.1 These Terms and Conditions shall remain in full force and effect
              while you use the Site or Services or are otherwise a user of the
              Site, as applicable. You may terminate your use or participation at
              any time, for any reason, by following the instructions for
              terminating user accounts in your account settings, if available, or
              by contacting us at dougiesguide@gmail.com.
            </Typography>
          </Grid>
          <Grid item className={classes.textWrapper}>
            <Typography variant={"body1"} className={classes.text}>
              9.2 Without limiting any other provision of these Terms and
              Conditions, we reserve the right to, in our sole discretion and
              without notice or liability, deny access to and use of the Site and
              the Services (including blocking certain IP addresses), to any
              person for any reason including without limitation for breach of any
              representation, warranty or covenant contained in these Terms and
              Conditions or of any applicable law or regulation.
            </Typography>
          </Grid>
          <Grid item className={classes.textWrapper}>
            <Typography variant={"body1"} className={classes.text}>
              If we determine, in our sole discretion, that your use of the
              Site/Services is in breach of these Terms and Conditions or of any
              applicable law or regulation, we may terminate your use or
              participation in the Site and the Services or delete your profile
              and any content or information that you posted at any time, without
              warning, in our sole discretion.
            </Typography>
          </Grid>
          <Grid item className={classes.textWrapper}>
            <Typography variant={"body1"} className={classes.text}>
              9.3 If we terminate or suspend your account for any reason set out
              in this Section 9, you are prohibited from registering and creating
              a new account under your name, a fake or borrowed name, or the name
              of any third party, even if you may be acting on behalf of the third
              party. In addition to terminating or suspending your account, we
              reserve the right to take appropriate legal action, including
              without limitation pursuing civil, criminal, and injunctive redress.
            </Typography>
          </Grid>

          {/*10.     Mobile Application*/}
          <Grid item className={classes.textWrapper}>
            <Typography variant={"h6"} className={classes.subTitle}>
              10. Mobile Application
            </Typography>
          </Grid>

          <Grid item className={classes.textWrapper}>
            <Typography variant={"body1"} className={classes.text}>
              10.1 If you access the Services via a mobile application, then we
              grant you a revocable, non-exclusive, non-transferable, limited
              right to install and use the mobile application on wireless
              electronic devices owned or controlled by you, and to access and use
              the mobile application on such devices strictly in accordance with
              the terms and conditions of this license. :
            </Typography>
          </Grid>
          <Grid item className={classes.textWrapper}>
            <Typography variant={"body1"} className={classes.text}>
              10.2 For business users only - You will not
            </Typography>
          </Grid>

          <Grid item className={classes.textWrapper}>
            <Typography
                variant={"body1"}
                className={classes.text}
                style={{ paddingLeft: "2em" }}
            >
              (a) reverse engineer, decompile or otherwise try to discover the
              source code of the software/application unless you have first
              written to us requesting interoperability information and we have
              failed to provide you with that information or if we have failed to
              offer to provide you with interoperability information on reasonable
              conditions";
            </Typography>
          </Grid>
          <Grid item className={classes.textWrapper}>
            <Typography
                variant={"body1"}
                className={classes.text}
                style={{ paddingLeft: "2em" }}
            >
              (b) make any modification, adaptation, improvement, enhancement,
              translation or derivative work from the application;
            </Typography>
          </Grid>
          <Grid item className={classes.textWrapper}>
            <Typography
                variant={"body1"}
                className={classes.text}
                style={{ paddingLeft: "2em" }}
            >
              (c) breach any applicable laws, rules or regulations in connection
              with your access or use of the application;
            </Typography>
          </Grid>
          <Grid item className={classes.textWrapper}>
            <Typography
                variant={"body1"}
                className={classes.text}
                style={{ paddingLeft: "2em" }}
            >
              (d) remove, alter or obscure any proprietary notice (including any
              notice of copyright or trade mark) posted by us or the licensors of
              the application;
            </Typography>
          </Grid>
          <Grid item className={classes.textWrapper}>
            <Typography
                variant={"body1"}
                className={classes.text}
                style={{ paddingLeft: "2em" }}
            >
              (e) use the application for any revenue generating endeavor,
              commercial enterprise, or other purpose for which it is not designed
              or intended;
            </Typography>
          </Grid>
          <Grid item className={classes.textWrapper}>
            <Typography
                variant={"body1"}
                className={classes.text}
                style={{ paddingLeft: "2em" }}
            >
              (f) make the application available over a network or other
              environment permitting access or use by multiple devices or users at
              the same time;
            </Typography>
          </Grid>
          <Grid item className={classes.textWrapper}>
            <Typography
                variant={"body1"}
                className={classes.text}
                style={{ paddingLeft: "2em" }}
            >
              (g) use the application for creating a product, service or software
              that is, directly or indirectly, competitive with or in any way a
              substitute for the application;
            </Typography>
          </Grid>
          <Grid item className={classes.textWrapper}>
            <Typography
                variant={"body1"}
                className={classes.text}
                style={{ paddingLeft: "2em" }}
            >
              (h) use the application to send automated queries to any website or
              to send any unsolicited commercial e-mail; or
            </Typography>
          </Grid>
          <Grid item className={classes.textWrapper}>
            <Typography
                variant={"body1"}
                className={classes.text}
                style={{ paddingLeft: "2em" }}
            >
              (i) use any proprietary information or any of our interfaces or our
              other intellectual property in the design, development, manufacture,
              licensing or distribution of any applications, accessories or
              devices for use with the application.
            </Typography>
          </Grid>

          <Grid item className={classes.textWrapper}>
            <Typography variant={"body1"} className={classes.text}>
              10.3 The following terms apply when you use a mobile application
              obtained from either the Apple Store or Google Play (each an App
              Distributor) to access the Services:
            </Typography>
          </Grid>

          <Grid item className={classes.textWrapper}>
            <Typography
                variant={"body1"}
                className={classes.text}
                style={{ paddingLeft: "2em" }}
            >
              (a) The licence granted to you for our mobile application is limited
              to a non-transferable licence to use the application on a device
              that utilizes the Apple iOS or Android operating system, as
              applicable, and in accordance with the usage rules set forth in the
              applicable App Distributor terms of service;
            </Typography>
          </Grid>
          <Grid item className={classes.textWrapper}>
            <Typography
                variant={"body1"}
                className={classes.text}
                style={{ paddingLeft: "2em" }}
            >
              (b) We are responsible for providing any maintenance and support
              services with respect to the mobile application as specified in
              these Terms and Conditions or as otherwise required under applicable
              law. You acknowledge that each App Distributor has no obligation
              whatsoever to furnish any maintenance and support services with
              respect to the mobile application;
            </Typography>
          </Grid>
          <Grid item className={classes.textWrapper}>
            <Typography
                variant={"body1"}
                className={classes.text}
                style={{ paddingLeft: "2em" }}
            >
              (c) In the event of any failure of the mobile application to conform
              to any applicable warranty, you may notify an App Distributor, and
              the App Distributor, in accordance with its terms and policies, may
              refund the purchase price, if any, paid for the mobile application,
              and to the maximum extent permitted by applicable law, an App
              Distributor will have no other warranty obligation whatsoever with
              respect to the mobile application;
            </Typography>
          </Grid>
          <Grid item className={classes.textWrapper}>
            <Typography
                variant={"body1"}
                className={classes.text}
                style={{ paddingLeft: "2em" }}
            >
              (d) You represent and warrant that (i) you are not located in a
              country that is subject to a U.S. government embargo, or that has
              been designated by the U.S. government as a “terrorist supporting”
              country; and (ii) you are not listed on any U.S. government list of
              prohibited or restricted parties;
            </Typography>
          </Grid>
          <Grid item className={classes.textWrapper}>
            <Typography
                variant={"body1"}
                className={classes.text}
                style={{ paddingLeft: "2em" }}
            >
              (e) You must comply with applicable third party terms of agreement
              when using the mobile application, e.g., if you have a VoIP
              application, then you must not be in breach of their wireless data
              service agreement when using the mobile application; and
            </Typography>
          </Grid>
          <Grid item className={classes.textWrapper}>
            <Typography
                variant={"body1"}
                className={classes.text}
                style={{ paddingLeft: "2em" }}
            >
              (f) You acknowledge and agree that the App Distributors are third
              party beneficiaries of these Terms and Conditions, and that each App
              Distributor will have the right (and will be deemed to have accepted
              the right) to enforce these Terms and Conditions against you as a
              third party beneficiary thereof.
            </Typography>
          </Grid>

          {/*11.    General*/}
          <Grid item className={classes.textWrapper}>
            <Typography variant={"h6"} className={classes.subTitle}>
              11. General
            </Typography>
          </Grid>

          <Grid item className={classes.textWrapper}>
            <Typography variant={"body1"} className={classes.text}>
              11.1 Visiting the Site, sending us emails, and completing online
              forms constitute electronic communications. You consent to receive
              electronic communications and you agree that all agreements,
              notices, disclosures, and other communications we provide to you
              electronically, via email and on the Site, satisfy any legal
              requirement that such communication be in writing.
            </Typography>
          </Grid>
          <Grid item className={classes.textWrapper}>
            <Typography variant={"body1"} className={classes.text}>
              You hereby agree to the use of electronic signatures, contracts,
              orders and other records and to electronic delivery of notices,
              policies and records of transactions initiated or completed by us or
              via the Site. You hereby waive any rights or requirements under any
              statutes, regulations, rules, ordinances or other laws in any
              jurisdiction which require an original signature or delivery or
              retention of non-electronic records, or to payments or the granting
              of credits by other than electronic means.
            </Typography>
          </Grid>
          <Grid item className={classes.textWrapper}>
            <Typography variant={"body1"} className={classes.text}>
              11.2 These Terms and Conditions and any policies or operating rules
              posted by us on the Site or in respect to the Services constitute
              the entire agreement and understanding between you and us.
            </Typography>
          </Grid>
          <Grid item className={classes.textWrapper}>
            <Typography variant={"body1"} className={classes.text}>
              11.3 Our failure to exercise or enforce any right or provision of
              these Terms and Conditions shall not operate as a waiver of such
              right or provision.
            </Typography>
          </Grid>
          <Grid item className={classes.textWrapper}>
            <Typography variant={"body1"} className={classes.text}>
              11.4 We may assign any or all of our rights and obligations to
              others at any time.
            </Typography>
          </Grid>
          <Grid item className={classes.textWrapper}>
            <Typography variant={"body1"} className={classes.text}>
              11.5 We shall not be responsible or liable for any loss, damage,
              delay or failure to act caused by any cause beyond our reasonable
              control.
            </Typography>
          </Grid>
          <Grid item className={classes.textWrapper}>
            <Typography variant={"body1"} className={classes.text}>
              11.6 If any provision or part of a provision of these Terms and
              Conditions is unlawful, void or unenforceable, that provision or
              part of the provision is deemed severable from these Terms and
              Conditions and does not affect the validity and enforceability of
              any remaining provisions.
            </Typography>
          </Grid>
          <Grid item className={classes.textWrapper}>
            <Typography variant={"body1"} className={classes.text}>
              11.7 There is no joint venture, partnership, employment or agency
              relationship created between you and us as a result of these Terms
              and Conditions or use of the Site or Services.
            </Typography>
          </Grid>

          <Grid item className={classes.textWrapper}>
            <Typography variant={"body1"} className={classes.text}>
              11.8 <span style={{ fontWeight: 600 }}>For consumers only</span> -
              Please note that these Terms and Conditions, their subject matter
              and their formation, are governed by English law. You and we both
              agree that the courts of England and Wales will have exclusive
              jurisdiction expect that if you are a resident of Northern Ireland
              you may also bring proceedings in Northern Ireland, and if you are
              resident of Scotland, you may also bring proceedings in Scotland. If
              you have any complaint or wish to raise a dispute under these Terms
              and Conditions or otherwise in relation to the Site please follow
              this link{" "}
              <a href="http://ec.europa.eu/odr">http://ec.europa.eu/odr</a>
            </Typography>
          </Grid>
          <Grid item className={classes.textWrapper}>
            <Typography variant={"body1"} className={classes.text}>
              11.9{" "}
              <span style={{ fontWeight: 600 }}>For business users only</span> -
              If you are a business user, these Terms and Conditions, their
              subject matter and their formation (and any non-contractual disputes
              or claims) are governed by English Law. We both agree to the
              exclusive jurisdiction of the courts of England and Wales.
            </Typography>
          </Grid>
          <Grid item className={classes.textWrapper}>
            <Typography variant={"body1"} className={classes.text}>
              11.10 Except as stated under the Mobile Application section, a
              person who is not a party to these Terms and Conditions shall have
              no right under the Contracts (Rights of Third Parties) Act 1999 to
              enforce any term of these Terms and Conditions.
            </Typography>
          </Grid>
          <Grid item className={classes.textWrapper}>
            <Typography variant={"body1"} className={classes.text}>
              11.11 In order to resolve a complaint regarding the Services or to
              receive further information regarding use of the Services, please
              contact us by email at dougiesguide@gmail.com or by post to:
            </Typography>
          </Grid>

          <Grid item className={classes.textWrapper}>
            <Typography variant={"body1"} className={classes.text}>
              DougiesGuide, <br />
              10581 EL CERRITO CHICO STREET, <br />
              Las Vegas, NV 89179, <br />
              United States
            </Typography>
          </Grid>

          <Grid item className={classes.textWrapper}>
            <Typography variant={"body1"} className={classes.text}>
              These terms of use were created using{" "}
              <a href="https://termly.io/products/terms-and-conditions-generator/?ftseo">
                Termly’s Terms and Conditions Generator.
              </a>
            </Typography>
          </Grid>
        </Grid>


      </Grid>


    </Grid>
  );
};

export default Terms;
