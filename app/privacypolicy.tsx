import { router } from "expo-router";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function PrivacyPolicy() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.menuIcon}
        >
          <Image source={require("../assets/images/backIocn.png")} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Privacy Policy</Text>
      </View>
      {/* Divider */}
      <View style={styles.divider} />
      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.contentWrapper}>
          <Text style={styles.sectionTitle}>Privacy Policy</Text>
          <Text style={styles.text}>
            A. We are sensitive to the scenario that We would be dealing with data and information of a personal nature. By using this Website and providing Your personal information, You consent to the terms of Our online privacy policy and to Our processing of such personal information for the purposes explained in this policy. By registering on the site or by subscribing to the services and providing Your contact details (telephone, email, mobile number, shipping address etc as more particularly mentioned in terms and conditions), You agree that this action constitutes a consent. You hereby consent to Our contacting You pursuant to the business relationship established using the information You provide to Us.
          </Text>
          <Text style={styles.text}>
            B. By visiting this Website You agree to be bound by the terms and conditions of this Privacy Policy. If You do not agree please do not use or access Our Website.
          </Text>
          <Text style={styles.text}>
            C. By mere use of the Website, You expressly consent to Our use and disclosure of Your personal information in accordance with this Privacy Policy. This Privacy Policy is incorporated into and subject to the Terms and conditions.
          </Text>
          <Text style={styles.text}>
            D. Note: Our privacy policy is subject to change at any time without notice. To make sure You are aware of any changes, please review this policy periodically.
          </Text>

          <Text style={styles.sectionTitle}>1. Privacy</Text>
          <Text style={styles.text}>
            Your privacy is very important to Us. We follow systematic and stringent procedures to protect the security of the information / data stored on Our Website. The information and documents that You have shared on Our Website is stored in secure server with encryption and can be accessed only for official purposes. Any of Our employee who violates Our privacy and/or security policies related to customer&apos;s data is subject to disciplinary action, including possible termination and civil and/or criminal prosecution.
          </Text>

          <Text style={styles.subsectionTitle}>A. Information collected by Us</Text>
          <Text style={styles.text}>
            We value the trust You place in Us. That&apos;s why We insist upon the highest standards for secure transactions and customer information privacy. The information collected by Us helps Us personalise and continually improve Your experience at www.switchmyloan.in. We also use this information to improve Our Website, prevent or detect fraud or abuses of Our Website. We collect information from You by following method:
          </Text>

          <Text style={styles.subsectionTitle}>B. Information provided by You:</Text>
          <Text style={styles.text}>
            We receive and store any information You enter on Our Website or give Us in any other way, including but not limited to name, gender, email id, telephone number, mobile number, billing addresses etc as more particularly mentioned in the Terms and Conditions. You can choose not to provide certain information, but in such event You may not be able to take advantage of many of Our features. We use the information that You provide for such purposes as responding to Your requests, customizing choices for You, improving Our Website, and communicating with You. Customer needs to fill all the mandatory information for availing the services provided by Us.
          </Text>

          <Text style={styles.subsectionTitle}>C. Information automatically collected by Us:</Text>
          <Text style={styles.text}>
            When You visit the Site, We automatically collect certain information about Your device, including information about Your web browser, IP address, time zone, and some of the cookies that are installed on Your device. Additionally, as You browse the Site, We collect information about the individual web pages or products that You view, what websites or search terms referred You to the Site, and information about how You interact with the Site.
          </Text>

          <Text style={styles.sectionTitle}>2. Use of the information:</Text>
          <Text style={styles.subsectionTitle}>A. The information collected as well as provide by You, are used and stored by Us on a secure network. (&quot;User Information&quot;).</Text>
          <Text style={styles.subsectionTitle}>B. Registration to Our Services shall entitle Us to send You promotional and transactional emails from Us. Subscription to Our newsletter entitle Us to send You periodic newsletters and promotional emails. If You do not want to receive e-mails or any other communication from Us, You may unsubscribe by clicking on &apos;unsubscribe&apos; at the footer of any email received from Us. Alternately, You may also email Us at info@switchmyloan.in.</Text>
          <Text style={styles.subsectionTitle}>C. Upon availing services from Our Website, We shall be entitled to use Your registered mobile number on the Website to send transaction related SMS to You, irrespective of DND services being activated on Your mobile. We may occasionally send promotional SMS to Your registered mobile number. Customer hereby authorizes Us to send transactional SMS to his registered number, even if the number is registered for DND &quot;Do not Disturb&quot; service.</Text>
          <Text style={styles.subsectionTitle}>D. In Our efforts to continually improve Our product and service offerings, We collect and analyse demographic and profile data about Our Users&apos; activity on Our Website.</Text>
          <Text style={styles.subsectionTitle}>E. We identify and use Your IP address to help diagnose problems with Our server, and to administer Our Website. Your IP address is also used to help identify You and to gather broad demographic information.</Text>
          <Text style={styles.subsectionTitle}>F. We will occasionally ask You to complete optional online surveys. These surveys may ask You for contact information and demographic information (like pin code, age, or income level). We use this data to tailor Your experience at Our Website, providing You with content that We think You might be interested in and to display content according to Your preferences.</Text>

          <Text style={styles.sectionTitle}>3. Sharing of the User information</Text>
          <Text style={styles.subsectionTitle}>A. We may share User information with Our other corporate entities and affiliates. These entities and affiliates may market to You as a result of such sharing.</Text>
          <Text style={styles.subsectionTitle}>B. You hereby allow, agree and consent to sharing of Your User information with Our Corporate Entities and Affiliates.</Text>
          <Text style={styles.subsectionTitle}>C. We may share the User information provided by You to the third party in order to complete the services availed by you.</Text>
          <Text style={styles.subsectionTitle}>D. We may disclose User information if required to do so by law or in the good faith belief that such disclosure is reasonably necessary to respond to subpoenas, court orders, or other legal process. We may disclose User information to law enforcement offices, under any law, for the being in force.</Text>

          <Text style={styles.sectionTitle}>4. Usage by Children</Text>
          <Text style={styles.subsectionTitle}>A. We don&apos;t knowingly collect, maintain or sell products or services to people under age 18 or use personal information from Our Website about children under age 18. Children should seek the consent of their parents before providing any information about themselves or their parents and other family members online.</Text>

          <Text style={styles.sectionTitle}>5. Security</Text>
          <Text style={styles.subsectionTitle}>A. We have in place appropriate technical and security measures to prevent unauthorized or unlawful access to or accidental loss of or destruction or damage to Your information. When We collect data through Our Website, We collect Your personal details on a secured server.</Text>
          <Text style={styles.subsectionTitle}>B. Though We are unable to guarantee 100% security, encryption makes it hard for a hacker to decrypt Your details. We maintain electronic and procedural safeguards in connection with the collection, storage and disclosure of Your information. As per Our security procedures We may occasionally request proof of identity before We disclose personal information to You. You are responsible for protecting against unauthorized access to your password and to your computer.</Text>

          <Text style={styles.sectionTitle}>6. Safety and Security Tips</Text>
          <Text style={styles.subsectionTitle}>A. Protect Your passwords.</Text>
          <Text style={styles.text}>
            i. Keep Your passwords private. Anybody who knows Your password can access Your account.
          </Text>
          <Text style={styles.text}>
            ii. When creating a valid password, use letters, numbers and symbols and it should be 6-15 characters long. Avoid using dictionary words, Your name, e-mail address, or other personal information that can be easily obtained. Frequent change of Your password also ensures better protection to Your account.
          </Text>
          <Text style={styles.text}>
            iii. Avoid using the same password for multiple online accounts.
          </Text>
          <Text style={styles.text}>
            iv. If You are logging in from a public computer or terminal, always log out when You complete an online session instead of closing the page.
          </Text>

          <Text style={styles.subsectionTitle}>B. Ensure Your Personal Computer is protected:</Text>
          <Text style={styles.text}>
            i. Fraudsters may send genuine-looking emails that contain viruses. These viruses, install a malicious code on Your Computer without Your knowledge and extract Your confidential information that You use to access Your online profile / account etc.
          </Text>

          <Text style={styles.subsectionTitle}>C. Tips to bear in mind:</Text>
          <Text style={styles.text}>
            i. Keep Your computer updated with latest anti-virus / anti-spyware software.
          </Text>
          <Text style={styles.text}>
            ii. Install a personal firewall on Your computer to protect Your account.
          </Text>
          <Text style={styles.text}>
            iii. Do not click on links or open attachments in unknown or unsolicited (spam) emails.
          </Text>

          <Text style={styles.consentText}>
            I Hereby Give my Consent to Switch My Loan to share my Data with Respective Lender for the Purpose of Availing Loan and Switch My Loan takes the Responsibility to Erase my data in case if the Purpose is completed or Purpose is not met.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
  consentText: {
    fontSize: 14,
    color: "rgba(0, 0, 0, 1)",
    fontFamily: "DMSans-Bold",
    lineHeight: 22,
    marginTop: 20,
    marginBottom: 14,
    fontWeight: "700",
    fontStyle: "italic",
  },
});
