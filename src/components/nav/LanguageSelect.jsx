import styles from "@/components/nav/nav.module.css";

const LanguageSelect=()=> {
    return (
      <select  className={styles.languageSelectBox}>
        <option>Lanaguage</option>
        <option value="1">English</option>
        <option value="2">Spanish</option>
        <option value="3">German</option>
      </select>
    )}
export default LanguageSelect