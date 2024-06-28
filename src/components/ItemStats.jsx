import { useTranslation } from 'react-i18next';

export default function ItemStats({ item }) {
  const { t } = useTranslation();

  return (
    <>
      <p className="text-yellow-400">{t(item?.name)}+9</p>
      <p>{t('From level')}: {item?.level}</p>
      <p className="text-green-400">{t('Attack Value')}: {item?.attackValue.min}-{item?.attackValue.max}</p>
      {item?.attackMagicValue === !0 && <p className="text-green-400">{item?.attackMagicValue}</p>}
      <p className="text-green-400">{t('Attack Speed')} +{item?.attackSpeed}%</p>
      {item?.bonus_1.value !== 0 && (
        <p className={`${item?.bonus_1.value < 0 ? "text-red-400" : 'text-green-400'}`}>
          {t(item?.bonus_1.name)} {item?.bonus_1.value}%
        </p>
      )}
      {item?.bonus_2.value !== 0 && (
        <p className={`${item?.bonus_2.value < 0 ? "text-red-400" : 'text-green-400'}`}>
          {t(item?.bonus_2.name)} {item?.bonus_2.value}%
        </p>
      )}
      <p className="text-green-400">{t(item?.bonus_3.name)} {item?.bonus_3.isStat ? `+${item?.bonus_3.value}` : `${item?.bonus_3.value}%`}</p>
      <p className="text-green-400">{t(item?.bonus_4.name)} {item?.bonus_4.isStat ? `+${item?.bonus_4.value}` : `${item?.bonus_4.value}%`}</p>
      <p className="text-green-400">{t(item?.bonus_5.name)} {item?.bonus_5.isStat ? `+${item?.bonus_5.value}` : `${item?.bonus_5.value}%`}</p>
      <p>{t('[Wearable]')}</p>
      <p>{item?.wearable?.map((wearableItem) => t(wearableItem)).join(" ")}</p>
    </>
  );
}
