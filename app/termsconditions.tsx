import { router } from "expo-router";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TermsConditions() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => router.back()} style={styles.menuIcon}>
          <Image source={require("../assets/images/backIocn.png")} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Terms & Conditions</Text>
      </View>
      {/* Divider */}
      <View style={styles.divider} />
      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.contentWrapper}>
          <Text style={styles.sectionTitle}>Terms And Conditions</Text>
          <Text style={styles.text}>
            Terms And Conditions Individuals who are registering themselves at
            www.switchmyloan.in, are authorizing us & our associated Banks/NBFCs
            partners and advertisers to give them an sms/call/e-mail to offer
            services for the product they have opted for, providing product
            knowledge, intimation of promotional offers running on the website &
            various FINANCIAL offers from associated third parties. And
            Irrespective of the fact if they have subscribed under DND or DNC
            service still Switchmyloan.in and partnering Banks/NBFCs and
            advertisers are authorized to give a call/sms/e-mail for the
            aforesaid purposes.
          </Text>
          <Text style={styles.text}>
            You hereby consent to Switch My Loan being appointed as your
            authorised representative to receive your Credit Information from
            Experian/CIBIL/EQUIFAX/CRIF for the purpose of Credit Assessment of
            the End User to Advise him on the best loan offers (End Use Purpose)
            or expiry of 6 months from the date the consent is collected;
            whichever is earlier. You hereby also agree to Terms & Conditions
          </Text>
          <Text style={styles.text}>
            Switchmyloan.in ensures that the individual&apos;s loan application
            is sent to bank which they have opted for, in case or otherwise, the
            lender/bank will be selected only with the customer&apos;s due
            consent. All the loan schemes are on discretion with the associated
            Banks/NBFCs partners and Advertisers.
          </Text>
          <Text style={styles.text}>
            This Privacy Policy covers Switchmyloan.in treatment of personally
            identifiable information that Switchmyloan.in collects when people
            are on the Switchmyloan.in site. This policy also covers treatment
            of any personally identifiable information that Switchmyloan.in
            business partners share with Switchmyloan.in. This policy is not
            applicable to the practices of companies that Switchmyloan.in does
            not own or regulates, or to individuals that Switchmyloan.in does
            not employ or manage.
          </Text>
          <Text style={styles.text}>
            Switchmyloan.in collects personally identifiable information when an
            individual inputs hie/her information on Loansbazaar site. They can
            use certain Switchmyloan.in products or services, when they visit
            Switchmyloan.in pages, and enter promotions or sweepstakes.
            Switchmyloan.in may also receive personally identifiable business
            information from our authorized partners.
          </Text>
          <Text style={styles.text}>
            When individuals attempt to register at Switchmyloan.in, they are
            been asked for their first name, last name, gender, zip/postal
            code,email, country, time zone, state, city and birth date. Once
            they get registered with Switchmyloan.in and sign in to our
            services, they will not be anonymous to us.
          </Text>
          <Text style={styles.text}>
            Also during the registration process, they will be requested to
            register their mobile numbers and email id, pager, or any other
            wireless device for communication in order to receive text messages,
            notifications, and other services. By registration they authorize us
            to send sms/email alerts to subscribers for their login details and
            alerts or some advertising messages/emails from us.
          </Text>
          <Text style={styles.text}>
            If at any time during the service tenure registered individuals wish
            to stop these sms/email alerts they can write an email to us along
            with mobile numbers and their mobile number will be deleted from the
            alerts database.
          </Text>
          <Text style={styles.text}>
            Switchmyloan.in does not provide the guarantee whether the
            advertisers are good, credible or quality sellers of goods / service
            providers. People must satisfy themselves about all relevant points
            prior to availing of the terms of service. Switchmyloan.in has not
            discussed any terms of engagement with any of the listed
            advertisers. Purchasing of products or services from advertisers
            shall be at their own risk.
          </Text>
          <Text style={styles.text}>
            We care about your privacy as much as you do. What it means is:
          </Text>
          <Text style={styles.text}>
            1. We never share your personal information with others unless
            required by law.
          </Text>
          <Text style={styles.text}>
            2. Your information is used only to complete the switching requested
            by you.
          </Text>
          <Text style={styles.text}>
            3. We send you updates, promotions and offers but you can easily
            remove yourself from our email list. But we maintain your records in
            our archives to readily serve you in the future.
          </Text>
          <Text style={styles.text}>
            4. Our highest priority is to make sure that your information stays
            safe and secure. This is why, we take steps to make sure that our
            servers and your information are completely protected.
          </Text>

          <Text style={styles.sectionTitle}>
            Your use of a Switchmyloan.in website
          </Text>
          <Text style={styles.text}>
            Your use of a Switchmyloan.in website www.Switchmyloan.in
            (hereinafter referred to as &quot;Switchmyloan.in&quot;) and
            services and tools are governed by the following terms and
            conditions. If you transact on Switchmyloan.in, you shall be subject
            to the policies that are applicable to the website for such
            transaction. By use of the website, you are contracting with
            Switchmyloan.in Technologies and Services Private Limited, a company
            incorporated under Companies Act, 1956 and these terms and
            conditions constitute your binding obligations.
          </Text>
          <Text style={styles.text}>
            For the purpose of these terms of use, wherever the context so
            require &apos;You&apos; shall mean any natural or legal person who
            has agreed to become a member of the Website by providing sign up
            data while registering on the Website.
          </Text>
          <Text style={styles.text}>
            When you use any of the services provided by the Switchmyloan.in,
            including but not limited to service provider comparisons,
            registering for switching and using information available on the
            Website you will be subject to the rules, guidelines, policies,
            terms, and conditions applicable to such service. Switchmyloan.in
            reserves the right, at its sole discretion, to change, modify, add
            or remove portions of these Terms of Use, at any time. It is your
            responsibility to check these Terms of Use periodically for changes.
            Your continued use of the Site following the posting of changes will
            mean that you accept and agree to the changes.
          </Text>
          <Text style={styles.text}>
            As long as you comply with these Terms of Use, Switchmyloan.in
            grants you a personal, non-exclusive, non-transferable, limited
            privilege to enter and use the Site.
          </Text>
          <Text style={styles.text}>
            ACCESSING, BROWSING OR OTHERWISE USING THE SITE INDICATES YOUR
            AGREEMENT TO ALL THE TERMS AND CONDITIONS IN THIS AGREEMENT, SO
            PLEASE READ THIS AGREEMENT CAREFULLY BEFORE PROCEEDING
          </Text>

          <Text style={styles.sectionTitle}>Membership Eligibility</Text>
          <Text style={styles.text}>
            Use of the Switchmyloan.in Website is available only to persons who
            can form legally binding contracts under Indian Contract Act, 1872.
            Persons who are &quot;incompetent to contract&quot; within the
            meaning of the Indian Contract Act, 1872 including minors,
            un-discharged insolvents etc. are not eligible to use the
            Switchmyloan.in Website. If you are a minor i.e. under the age of 18
            years, you shall not register as a member of the Switchmyloan.in and
            shall not transact or use Switchmyloan.in website. As a minor if you
            wish to use or transact on Switchmyloan.in, such use or transaction
            may be made by your legal guardian or parents who have registered as
            users of the Switchmyloan.in. Switchmyloan.in reserves the right to
            terminate your membership and refuse to provide you with access to
            the Switchmyloan.in if it is brought to Switchmyloan.in&apos;s
            notice or if it is discovered that you are under the age of 18
            years.
          </Text>

          <Text style={styles.sectionTitle}>
            Your Account and Registration Obligations
          </Text>
          <Text style={styles.text}>
            If you use Switchmyloan.in, you shall be responsible for maintaining
            the accuracy of the information that you provide. You agree that if
            you provide any information that is untrue, inaccurate, not current
            or incomplete or Switchmyloan.in has reasonable grounds to suspect
            that such information is untrue, inaccurate, not current or
            incomplete, or not in accordance with the this Terms of Use,
            Switchmyloan.in has the right to indefinitely suspend or terminate
            or block access of your membership with Switchmyloan.in and refuse
            to provide you with access to the Website.
          </Text>

          <Text style={styles.sectionTitle}>Communications</Text>
          <Text style={styles.text}>
            When You use the Website or send emails or other data, information
            or communication to Switchmyloan.in, You agree and understand that
            You are communicating with Switchmyloan.in through electronic
            records and You consent to receive communications via electronic
            records from Switchmyloan.in periodically and as and when required.
            Switchmyloan.in may communicate with You by email or by such other
            mode of communication, electronic or otherwise.
          </Text>

          <Text style={styles.sectionTitle}>Charges</Text>
          <Text style={styles.text}>
            Switchmyloan.in does not charge any fee for browsing on the
            Switchmyloan.in Website. Switchmyloan.in charges a fee for executing
            a switch in service providers on your behalf. However
            Switchmyloan.in reserves the right to change the fee and change its
            policies from time to time. In particular, Switchmyloan.in may at
            its sole discretion introduce new services and modify some or all of
            the existing services offered on the Switchmyloan.in. In such an
            event Switchmyloan.in reserves, without notice to You, the right to
            introduce fees for the new services offered or amend/introduce fees
            for existing services, as the case may be. Changes to the Fee and
            related policies shall automatically become effective immediately
            once implemented on Switchmyloan.in. Unless otherwise stated, all
            fees shall be quoted in Indian Rupees. You shall be solely
            responsible for compliance of all applicable laws including those in
            India for making payments to Switchmyloan.in.
          </Text>

          <Text style={styles.sectionTitle}>
            Use of Switchmyloan.in Website www.Switchmyloan.in
          </Text>
          <Text style={styles.text}>
            You agree, undertake and confirm that your use of Switchmyloan.in
            shall be strictly governed by the following binding principles:
          </Text>
          <Text style={styles.subsectionTitle}>
            A. You shall not host, display, upload, modify, publish, transmit,
            update or share any information that:
          </Text>
          <Text style={styles.text}>
            1. Belongs to another person and to which You have no right to.
          </Text>
          <Text style={styles.text}>
            2. Is grossly harmful, harassing, blasphemous, defamatory, obscene,
            pornographic, pedophilic, libelous, invasive of another&apos;s
            privacy, hateful, or racially, ethnically objectionable,
            disparaging, relating or encouraging money laundering or gambling,
            or otherwise unlawful in any manner whatever; or unlawfully
            threatening or unlawfully harassing including but not limited to
            &quot;indecent representation of women&quot; within the meaning of
            the Indecent Representation of Women (Prohibition) Act, 1986;
          </Text>
          <Text style={styles.text}>3. Is misleading in any way</Text>
          <Text style={styles.text}>
            4. Is patently offensive to the online community, such as sexually
            explicit content, or content that promotes obscenity, pedophilia,
            racism, bigotry, hatred or physical harm of any kind against any
            group or individual;
          </Text>
          <Text style={styles.text}>
            5. Harasses or advocates harassment of another person;
          </Text>
          <Text style={styles.text}>
            6. involves the transmission of &quot;junk mail,&quot; &quot;chain
            letters,&quot; or unsolicited mass mailing or &quot;spamming&quot;;
          </Text>
          <Text style={styles.text}>
            7. promotes illegal activities or conduct that is abusive,
            threatening, obscene, defamatory or libelous;
          </Text>
          <Text style={styles.text}>
            8. infringes upon or violates any third party&apos;s rights
            [(including, but not limited to, intellectual property rights,
            rights of privacy (including without limitation unauthorized
            disclosure of a person&apos;s name, email address, physical address
            or phone number) or rights of publicity];
          </Text>
          <Text style={styles.text}>
            9. promotes an illegal or unauthorized copy of another person&apos;s
            copyrighted work (see &quot;Copyright complaint&quot; below for
            instructions on how to lodge a complaint about uploaded copyrighted
            material), such as providing pirated computer programs or links to
            them, providing information to circumvent manufacture-installed
            copy-protect devices, or providing pirated music or links to pirated
            music files;
          </Text>
          <Text style={styles.text}>
            10. contains restricted or password-only access pages, or hidden
            pages or images (those not linked to or from another accessible
            page);
          </Text>
          <Text style={styles.text}>
            11. provides material that exploits people in a sexual, violent or
            otherwise inappropriate manner or solicits personal information from
            anyone;
          </Text>
          <Text style={styles.text}>
            12. provides instructional information about illegal activities such
            as making or buying illegal weapons, violating someone&apos;s
            privacy, or providing or creating computer viruses;
          </Text>
          <Text style={styles.text}>
            13. contains video, photographs, or images of another person age 18
            or older without his or her express written consent and permission
            or those of any minor (regardless of whether you have consent from
            the minor or his or her legal guardian).
          </Text>
          <Text style={styles.text}>
            14. tries to gain unauthorized access or exceeds the scope of
            authorized access (as defined herein and in other applicable Codes
            of Conduct or End User Access and License Agreements) to the Sites
            or to profiles, blogs, communities, account information, bulletins,
            friend request, or other areas of the Sites or solicits passwords or
            personal identifying information for commercial or unlawful purposes
            from other users;
          </Text>
          <Text style={styles.text}>
            15. Engages in commercial activities and/or sales without
            Switchmyloan.in&apos;s prior written consent such as contests,
            sweepstakes, barter, advertising and pyramid schemes, or the buying
            or selling of &quot;virtual&quot; items related to the Sites.
            Throughout this Terms of Use, Switchmyloan.in &quot;prior written
            consent&quot; means a communication coming from Switchmyloan.in
            Legal department, specifically in response to your request, and
            specifically addressing the activity or conduct for which you seek
            authorization;
          </Text>
          <Text style={styles.text}>
            16. solicits gambling or engages in any gambling activity which
            Switchmyloan.in, in its sole discretion, believes is or could be
            construed as being illegal;
          </Text>
          <Text style={styles.text}>
            17. interferes with another user&apos;s use and enjoyment of the
            Switchmyloan.in Website or any other individual&apos;s user and
            enjoyment of similar services;
          </Text>
          <Text style={styles.text}>
            18. Refers to any website or URL that, in the sole discretion of
            Switchmyloan.in, contains material that is inappropriate for the
            Switchmyloan.in Website or any other Website, contains content that
            would be prohibited or violates the letter or spirit of these Terms
            of Use.
          </Text>
          <Text style={styles.text}>19. harm minors in any way;</Text>
          <Text style={styles.text}>
            20. infringes any patent, trademark, copyright or other proprietary
            rights or third party&apos;s trade secrets or rights of publicity or
            privacy or shall not be fraudulent or involve the sale of
            counterfeit or stolen items;
          </Text>
          <Text style={styles.text}>
            21. violates any law for the time being in force;
          </Text>
          <Text style={styles.text}>
            22. deceives or misleads the addressee/ users about the origin of
            such messages or communicates any information which is grossly
            offensive or menacing in nature;
          </Text>
          <Text style={styles.text}>23. impersonate another person;</Text>
          <Text style={styles.text}>
            24. contains software viruses or any other computer code, files or
            programs designed to interrupt, destroy or limit the functionality
            of any computer resource; or contains any Trojan horses, worms, time
            bombs, cancelbots, easter eggs or other computer programming
            routines that may damage, detrimentally interfere with, diminish
            value of, surreptitiously intercept or expropriate any system, data
            or personal information;
          </Text>
          <Text style={styles.text}>
            25. Threatens the unity, integrity, defence, security or sovereignty
            of India, friendly relations with foreign states, or public order or
            causes incitement to the commission of any cognizable offence or
            prevents investigation of any offence or is insulting any other
            nation.
          </Text>
          <Text style={styles.text}>
            26. shall not be false, inaccurate or misleading;
          </Text>
          <Text style={styles.text}>
            27. shall not, directly or indirectly, offer, attempt to offer,
            trade or attempt to trade in any item, the dealing of which is
            prohibited or restricted in any manner under the provisions of any
            applicable law, rule, regulation or guideline for the time being in
            force.
          </Text>
          <Text style={styles.text}>
            28. shall not create liability for us or cause us to lose (in whole
            or in part) the services of our ISPs or other suppliers;
          </Text>

          <Text style={styles.subsectionTitle}>
            B. You shall not use any &quot;deep-link&quot;,
            &quot;page-scrape&quot;, &quot;robot&quot;, &quot;spider&quot; or
            other automatic device, program, algorithm or methodology, or any
            similar or equivalent manual process, to access, acquire, copy or
            monitor any portion of the Website or any Content, or in any way
            reproduce or circumvent the navigational structure or presentation
            of the Website or any Content, to obtain or attempt to obtain any
            materials, documents or information through any means not purposely
            made available through the Website. Switchmyloan.in reserves the
            right to bar any such activity.
          </Text>

          <Text style={styles.subsectionTitle}>
            C. You shall not attempt to gain unauthorized access to any portion
            or feature of Switchmyloan.in website, or any other systems or
            networks connected to Switchmyloan.in Website or to any
            Switchmyloan.in&apos;s server, computer, network, or to any of the
            services offered on or through Switchmyloan.in Website, by hacking,
            password &quot;mining&quot; or any other illegitimate means.
          </Text>

          <Text style={styles.subsectionTitle}>
            D. You shall not probe, scan or test the vulnerability of
            Switchmyloan.in website or any network connected to Switchmyloan.in
            website nor breach the security or authentication measures on
            Switchmyloan.in website or any network connected to Switchmyloan.in
            Website. You may not reverse look-up, reverse engineer, trace or
            seek to trace any information on any other user of or visitor to
            Switchmyloan.in Website, or any other customer of Switchmyloan.in,
            including any Switchmyloan.in account not owned by you, to its
            source, or exploit Switchmyloan.in Website or any service or
            information made available or offered by or through Switchmyloan.in
            Website, in any way where the purpose is to reveal any information,
            including but not limited to personal identification or information,
            other than your own information, as provided for by Switchmyloan.in
            Website.
          </Text>

          <Text style={styles.subsectionTitle}>
            E. You agree that you will not take any action that imposes an
            unreasonable or disproportionately large load on the infrastructure
            of Switchmyloan.in Website or Switchmyloan.in&apos;s systems or
            networks, or any systems or networks connected to the
            Switchmyloan.in.
          </Text>

          <Text style={styles.subsectionTitle}>
            F. You agree not to use any device, software or routine to interfere
            or attempt to interfere with the proper working of the Website or
            any transaction being conducted on the Website, or with any other
            person&apos;s use of the Website.
          </Text>

          <Text style={styles.subsectionTitle}>
            G. You may not forge headers or otherwise manipulate identifiers in
            order to disguise the origin of any message or transmittal you send
            to Switchmyloan.in on or through the Website or any service offered
            on or through the Website. You may not pretend that you are, or that
            you represent, someone else, or impersonate any other individual or
            entity
          </Text>

          <Text style={styles.subsectionTitle}>
            H. You may not use the Website or any Content for any purpose that
            is unlawful or prohibited by these Terms of Use, or to solicit the
            performance of any illegal activity or other activity which
            infringes the rights of Switchmyloan.in or others.
          </Text>

          <Text style={styles.subsectionTitle}>
            I. Solely to enable Switchmyloan.in to use the information you
            supply us with, so that we are not violating any rights you might
            have in Your Information, you agree to grant us a non-exclusive,
            worldwide, perpetual, irrevocable, royalty-free, sub-licensable
            (through multiple tiers) right to exercise the copyright, publicity,
            database rights or any other rights you have in Your Information, in
            any media now known or not currently known, with respect to Your
            Information. Switchmyloan.in will only use Your Information in
            accordance with the terms of use and Switchmyloan.in&apos;s Privacy
            Policy.
          </Text>

          <Text style={styles.subsectionTitle}>
            J. You shall not engage in advertising to, or solicitation of, other
            users of Switchmyloan.in to buy or sell any products or services,
            including, but not limited to, products or services related being
            displayed on Switchmyloan.in or related to Switchmyloan.in. You may
            not transmit any chain letters or unsolicited commercial or junk
            email to other users via Switchmyloan.in. It shall be a violation of
            these Terms of Use to use any information obtained from
            Switchmyloan.in in order to harass, abuse, or harm another person,
            or in order to contact, advertise to, solicit, or sell to another
            person outside of the Switchmyloan.in without Switchmyloan.in&apos;s
            prior explicit consent. In order to protect our users from such
            advertising or solicitation, Switchmyloan.in reserves the right to
            restrict the number of messages or emails which a user may send to
            other users in any 24-hour period which Switchmyloan.in deems
            appropriate in its sole discretion.
          </Text>

          <Text style={styles.subsectionTitle}>
            K. Switchmyloan.in reserves the right, but has no obligation, to
            monitor the materials posted on Switchmyloan.in website.
            Switchmyloan.in shall have the right to remove or edit any Content
            that in its sole discretion violates, or is alleged to violate, any
            applicable law or either the spirit or letter of these Terms of Use.
            Notwithstanding this right of Switchmyloan.in, YOU REMAIN SOLELY
            RESPONSIBLE FOR THE CONTENT OF THE MATERIALS YOU POST ON THE
            SWITCHMYLOAN.IN WEBSITE AND IN YOUR PRIVATE MESSAGES. Please be
            advised that such Content posted does not necessarily reflect the
            views of Switchmyloan.in. In no event shall Switchmyloan.in assume
            or have any responsibility or liability for any Content posted or
            for any claims, damages or losses resulting from use of Content
            and/or appearance of Content on Switchmyloan.in. You hereby
            represent and warrant that you have all necessary rights in and to
            all Content you provide and all information it contains and that
            such Content shall not infringe any proprietary or other rights of
            third parties or contain any libelous, tortuous, or otherwise
            unlawful information.
          </Text>

          <Text style={styles.subsectionTitle}>
            L. Your correspondence or business dealings with, or participation
            in promotions of, advertisers found on or through Switchmyloan.in,
            including payment and delivery of related goods or services, and any
            other terms, conditions, warranties or representations associated
            with such dealings, are solely between you and such advertiser.
            Switchmyloan.in shall not be responsible or liable for any loss or
            damage of any sort incurred as the result of any such dealings or as
            the result of the presence of such advertisers on Switchmyloan.in.
          </Text>

          <Text style={styles.subsectionTitle}>
            M. It is possible that other users (including unauthorized users or
            &quot;hackers&quot;) may post or transmit offensive or obscene
            materials on Switchmyloan.in and that you may be involuntarily
            exposed to such offensive and obscene materials. It also is possible
            for others to obtain personal information about you due to your use
            of Switchmyloan.in, and that the recipient may use such information
            to harass or injure you. Switchmyloan.in does not approve of such
            unauthorized uses but by using the Switchmyloan.in Website you
            acknowledge and agree that Switchmyloan.in is not responsible for
            the use of any personal information that you publicly disclose or
            share with others on Switchmyloan.in. Please carefully select the
            type of information that you publicly disclose or share with others
            on Switchmyloan.in.
          </Text>

          <Text style={styles.subsectionTitle}>
            N. Switchmyloan.in shall have all the rights to take necessary
            action and claim damages that may occur due to your
            involvement/participation in any way on your own or through group/s
            of People, intentionally or unintentionally in DoS/DDoS (Distributed
            Denial of Services).
          </Text>

          <Text style={styles.sectionTitle}>Contents Posted on Site</Text>
          <Text style={styles.text}>
            All text, graphics, user interfaces, visual interfaces, photographs,
            trademarks, logos, sounds, music, artwork and computer code
            (collectively, &quot;Content&quot;), including but not limited to
            the design, structure, selection, coordination, expression,
            &quot;look and feel&quot; and arrangement of such Content, contained
            on the Switchmyloan.in is owned, controlled or licensed by or to
            Switchmyloan.in, and is protected by trade dress, copyright, patent
            and trademark laws, and various other intellectual property rights
            and unfair competition laws. Except as expressly provided in these
            Terms of Use, no part of the Switchmyloan.in and no Content may be
            copied, reproduced, republished, uploaded, posted, publicly
            displayed, encoded, translated, transmitted or distributed in any
            way (including &quot;mirroring&quot;) to any other computer, server,
            website or other medium for publication or distribution or for any
            commercial enterprise, without Switchmyloan.in&apos;s express prior
            written consent.
          </Text>
          <Text style={styles.text}>
            You may use information on Switchmyloan.in products and services
            purposely made available by Switchmyloan.in for downloading from the
            Site, provided that you
          </Text>
          <Text style={styles.text}>
            A. Not remove any proprietary notice language in all copies of such
            documents,
          </Text>
          <Text style={styles.text}>
            B. Use such information only for your personal, non-commercial
            informational purpose and do not copy or post such information on
            any networked computer or broadcast it in any media
          </Text>
          <Text style={styles.text}>
            C. Make no modifications to any such information, and
          </Text>
          <Text style={styles.text}>
            D. Not make any additional representations or warranties relating to
            such documents.
          </Text>
          <Text style={styles.text}>
            You shall be responsible for any notes, messages, e-mails, billboard
            postings, photos, drawings, profiles, opinions, ideas, images,
            videos, audio files or other materials or information posted or
            transmitted to the Sites (collectively, &quot;Content&quot;). Such
            Content will become the property of Switchmyloan.in and you grant
            Switchmyloan.in the worldwide, perpetual and transferable rights in
            such Content. Switchmyloan.in shall be entitled to, consistent with
            our Privacy Policy, use the Content or any of its elements for any
            type of use forever, including but not limited to promotional and
            advertising purposes and in any media whether now known or hereafter
            devised, including the creation of derivative works that may include
            Content you provide. You agree that any Content you post may be used
            by Switchmyloan.in, consistent with our Privacy Policy and Rules of
            Conduct on Site as mentioned herein, and you are not entitled to any
            payment or other compensation for such use.
          </Text>

          <Text style={styles.sectionTitle}>Other Businesses</Text>
          <Text style={styles.text}>
            Switchmyloan.in does not take responsibility or liability for the
            actions, products, content and services on Switchmyloan.in website,
            which are linked to Affiliates and / or third party websites using
            Switchmyloan.in APIs or otherwise. In addition, Switchmyloan.in may
            provide links to the third party websites of affiliated companies
            and certain other businesses for which, Switchmyloan.in assumes no
            responsibility for examining or evaluating the products and services
            offered by them, and Switchmyloan.in does not warrant the offerings
            of, any of these businesses or individuals or the content of such
            third party website(s). Switchmyloan.in does not in any way endorse
            any third party website(s) or content thereof.
          </Text>

          <Text style={styles.sectionTitle}>Links</Text>
          <Text style={styles.text}>
            Switchmyloan.in welcomes links to this site. You may establish a
            hypertext link to Switchmyloan.in website, provided that the link
            does not state or imply any sponsorship or endorsement of your site
            by Switchmyloan.in. You must not use on your site or in any other
            manner any trademarks, service marks or any other materials
            appearing on the Switchmyloan.in, including any logos or characters,
            without the express written consent of Switchmyloan.in and the owner
            of the mark or materials. You must not frame or otherwise
            incorporate into another third party website or present in
            conjunction with or juxtaposed against such a website any of the
            content or other materials on the Switchmyloan.in website without
            Switchmyloan.in&apos;s prior written consent.
          </Text>

          <Text style={styles.sectionTitle}>Privacy</Text>
          <Text style={styles.text}>
            We view protection of Your privacy as a very important principle. We
            understand clearly that you and Your Personal Information is one of
            our most important assets. We store and process Your Information on
            computers that may be protected by physical as well as reasonable
            technological security measures. If you object to your Information
            being transferred or used in this way please do not use
            Switchmyloan.in Website.
          </Text>

          <Text style={styles.sectionTitle}>
            Disclaimer Of Warranties And Liability
          </Text>
          <Text style={styles.text}>
            This website, all the materials and products (including but not
            limited to software) and services, included on or otherwise made
            available to you through this site are provided on Switchmyloan.in
            on &quot;as is&quot; and &quot;as available&quot; basis without any
            representation or warranties, express or implied except otherwise
            specified in writing. Without prejudice to the forgoing paragraph,
            Switchmyloan.in does not warrant that:
          </Text>
          <Text style={styles.text}>
            A. This website will be constantly available, or available at all;
            or
          </Text>
          <Text style={styles.text}>
            B. The information on this website is complete, true, accurate or
            non-misleading.
          </Text>
          <Text style={styles.text}>
            Switchmyloan.in will not be liable to you in any way or in relation
            to the contents of, or use of, or otherwise in connection with,
            Switchmyloan.in website. Switchmyloan.in does not warrant that this
            site; information, content, materials, product (including software)
            or services included on or otherwise made available to you through
            Switchmyloan.in website; their servers; or electronic communication
            sent from Switchmyloan.in are free of viruses or other harmful
            components. Nothing on Switchmyloan.in constitutes, or is meant to
            constitute, advice of any kind. You will be required to enter a
            valid phone number while placing an order on Switchmyloan.in. By
            registering your phone number with us, you consent to be contacted
            by Switchmyloan.in via phone calls and / or SMS notifications, in
            case of any order or shipment or delivery related updates.
            Switchmyloan.in will not use your personal information to initiate
            any promotional phone calls or SMS&apos;.
          </Text>

          <Text style={styles.sectionTitle}>Payment</Text>
          <Text style={styles.text}>
            While availing any of the payment method/s offered at
            Switchmyloan.in, Switchmyloan.in will not be responsible or assume
            any liability, whatsoever in respect of any loss or damage arising
            directly or indirectly to you due to:
          </Text>
          <Text style={styles.text}>
            A. Lack of authorization for any transaction/s, or
          </Text>
          <Text style={styles.text}>
            B. Exceeding the preset limit mutually agreed by you and between
            your &quot;Bank/s&quot;, or
          </Text>
          <Text style={styles.text}>
            C. Any payment issues arising out of the transaction, or
          </Text>
          <Text style={styles.text}>
            D. 4. Decline of transaction for any other reason/s.
          </Text>
          <Text style={styles.text}>
            All payments made against the purchases/services on Switchmyloan.in
            by you shall be compulsorily in Indian Rupees acceptable by the
            Union of India. Switchmyloan.in does not accept any other form of
            currency with respect to the purchases made on Switchmyloan.in.
          </Text>

          <Text style={styles.sectionTitle}>Cancellation of order</Text>
          <Text style={styles.text}>
            Switchmyloan.in reserves the right to cancel any order without any
            explanation for doing so, under situation where Switchmyloan.in is
            not able to meet the requirement of the order placed or order so
            placed/cancelled does not comply with the Switchmyloan.in policy or
            for any other reason. However, Switchmyloan.in will ensure that any
            communication of cancellation of an order, so cancelled, is
            intimated within appropriate time to the concerned person and any
            applicable refund, will be made in reasonable time.
          </Text>

          <Text style={styles.sectionTitle}>Refund of payment</Text>
          <Text style={styles.text}>
            Switchmyloan.in will refund the payment made by the users in a case
            it is unable to process the order. Refund will not be made if such
            inability arises out of:
          </Text>
          <Text style={styles.text}>
            A. User changing his/her mind after Switchmyloan.in has made efforts
            towards fulfillment of the order.
          </Text>
          <Text style={styles.text}>
            B. Incomplete or incorrect information provided by the user.
          </Text>
          <Text style={styles.text}>
            No refunds would be made after a switch has been completed.
          </Text>

          <Text style={styles.sectionTitle}>Breach</Text>
          <Text style={styles.text}>
            Without limiting other remedies, Switchmyloan.in may limit your
            activity, immediately remove your information, warn other Users of
            your actions, immediately temporarily/indefinitely suspend or
            terminate or block your membership, and/or refuse to provide you
            with access to the Switchmyloan.in website in the event, but not
            limited to:
          </Text>
          <Text style={styles.text}>
            A. If you breach the Terms of Use or Privacy Policy or other rules
            and policies, if any;
          </Text>
          <Text style={styles.text}>
            B. If Switchmyloan.in is unable to verify or authenticate any
            information you provide; or
          </Text>
          <Text style={styles.text}>
            C. If it is believed that your actions may cause legal liability for
            you, other Users or Switchmyloan.in. Switchmyloan.in may at any time
            at its sole discretion reinstate suspended Users. A User that has
            been suspended or blocked may not register or attempt to register
            with Switchmyloan.in or use Switchmyloan.in Website in any manner
            whatsoever until such time that such User is reinstated by
            Switchmyloan.in. Notwithstanding the foregoing, if you breach the
            Terms of Use or Privacy Policy or other ruler and policies,
            Switchmyloan.in reserves the right to recover any amounts due and
            owing by you to Switchmyloan.in and to take strict legal action
            including but not limited to a referral to the appropriate police or
            other authorities for initiating criminal or other proceedings
            against you.
          </Text>

          <Text style={styles.sectionTitle}>Indemnity</Text>
          <Text style={styles.text}>
            You shall indemnify and hold harmless Switchmyloan.in, its owner,
            licensee, affiliates, subsidiaries, group companies (as applicable)
            and their respective officers, directors, agents, and employees,
            from any claim or demand, or actions including reasonable
            attorneys&apos; fees, made by any third party or penalty imposed due
            to or arising out of your breach of this Terms of Use, privacy
            Policy and other Policies, or your violation of any law, rules or
            regulations or the rights of a third party.
          </Text>

          <Text style={styles.sectionTitle}>Applicable Law</Text>
          <Text style={styles.text}>
            This Agreement shall be governed by and interpreted and construed in
            accordance with the laws of India. The place of jurisdiction shall
            be exclusively in Mumbai.
          </Text>

          <Text style={styles.sectionTitle}>
            Jurisdictional Issues/Sale in India Only
          </Text>
          <Text style={styles.text}>
            Unless otherwise specified, the material on Switchmyloan.in is
            presented solely for the purpose of sale in India. Switchmyloan.in
            makes no representation that materials in Switchmyloan.in are
            appropriate or available for use in other locations/Countries other
            than India. Those who choose to access this site from other
            locations/Countries other than India do so on their own initiative
            and Switchmyloan.in is not responsible for compliance with local
            laws, if and to the extent local laws are applicable.
          </Text>

          <Text style={styles.sectionTitle}>
            Trademark, Copyright and Restriction
          </Text>
          <Text style={styles.text}>
            This site is controlled and operated by Switchmyloan.in. All
            material on this site, including images, illustrations, audio clips,
            and video clips, are protected by copyrights, trademarks, and other
            intellectual property rights that are owned and controlled by us or
            by other parties that have licensed their material to us. Material
            on Switchmyloan.in web site owned, operated, licensed or controlled
            by us is solely for your personal, non-commercial use. You must not
            copy, reproduce, republish, upload, post, transmit or distribute
            such material in any way, including by e-mail or other electronic
            means and whether directly or indirectly and you must not assist any
            other person to do so. Without the prior written consent of the
            owner, modification of the materials, use of the materials on any
            other web site or networked computer environment or use of the
            materials for any purpose other than personal, non-commercial use is
            a violation of the copyrights, trademarks and other proprietary
            rights, and is prohibited. Any use for which you receive any
            remuneration, whether in money or otherwise, is a commercial use for
            the purposes of this clause.
          </Text>

          <Text style={styles.sectionTitle}>Copyright complaint</Text>
          <Text style={styles.text}>
            We at Switchmyloan.in respect the intellectual property of others.
            In case you feel that your work has been copied in a way that
            constitutes copyright infringement you can write to us at
            legal@Switchmyloan.in.in.
          </Text>

          <Text style={styles.sectionTitle}>Product Description</Text>
          <Text style={styles.text}>
            Switchmyloan.in.in tries to be as accurate as possible. However,
            Switchmyloan.in does not warrant that product description or other
            content of this site is accurate, complete, reliable, current, or
            error-free.
          </Text>

          <Text style={styles.sectionTitle}>Limitation of Liability</Text>
          <Text style={styles.text}>
            IN NO EVENT SHALL SWITCHMYLOAN.IN BE LIABLE FOR ANY SPECIAL,
            INCIDENTAL, INDIRECT OR CONSEQUENTIAL DAMAGES OF ANY KIND IN
            CONNECTION WITH THIS AGREEMENT, EVEN IF SWITCHMYLOAN.IN HAS BEEN
            INFORMED IN ADVANCE OF THE POSSIBILITY OF SUCH DAMAGES.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(249, 249, 249, 1)",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 16,
    paddingHorizontal: 16,
    backgroundColor: "rgba(249, 249, 249, 1)",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(234, 236, 240, 1)",
  },
  menuIcon: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 1)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  headerTitle: {
    color: "rgba(0, 0, 0, 1)",
    fontSize: 20,
    fontWeight: "700",
    fontFamily: "DMSans-Bold",
    marginLeft: 10,
  },
  divider: {
    height: 1,
    backgroundColor: "#F2F2F2",
    width: "100%",
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 24,
  },
  contentWrapper: {
    backgroundColor: "#fff",
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 12,
    marginTop: 16,
    color: "rgba(0, 0, 0, 1)",
    fontFamily: "DMSans-Bold",
  },
  subsectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    marginTop: 12,
    color: "rgba(0, 0, 0, 1)",
    fontFamily: "DMSans-SemiBold",
  },
  text: {
    fontSize: 14,
    color: "rgba(0, 0, 0, 1)",
    fontFamily: "DMSans-Regular",
    lineHeight: 22,
    marginBottom: 14,
    fontWeight: "300",
  },
});
