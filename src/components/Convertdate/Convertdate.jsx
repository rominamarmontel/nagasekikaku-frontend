import dayjs from 'dayjs';

export default function ConvertDate({ convertDate }) {
  const publishedAt = dayjs(convertDate).format('YYYY.MM.DD');
  return (
    <time dateTime={convertDate}>
      {publishedAt}
    </time>
  );
}