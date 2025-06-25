
import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <>
    <div className="d-flex flex-row-reverse">
      <div className="text-end me-2 mt-2 ">
        <select className="form-select" onChange={(e) => changeLanguage(e.target.value)}> 
          <option value="en">English</option>
          <option value="ar">Arabic</option>
        </select>
      </div>
    </div>
      {/* <button onClick={() => changeLanguage('en')}>English</button>
      <button onClick={() => changeLanguage('es')}>Español</button> */}
    </>
  );
};

export default LanguageSwitcher;