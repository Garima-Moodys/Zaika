import styles from "../css/Footer.module.css";

export default function Footer() {
  return (
    <div className={styles.footer}>
      <table>
        <thead>
          <tr>
            <th>LOCATION</th>
            <th>OPEN HOURS</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <p>XYZ Main Street, Rajouri Garden</p>
              <p>New Delhi, 110034</p>
            </td>
            <td>
              <p>Monday-Thursday: 10:00 AM - 10:00 PM</p>
              <p>Friday-Sunday: 10:00 AM - 11:00 PM</p>
            </td>
            <td>
              <p>
                Available for Catering
                <br />
                Email or Call Us
              </p>
            </td>
          </tr>
        </tbody>
      </table>
      <p>&copy; 2024 ZAIKA. All rights reserved.</p>
    </div>
  );
}
