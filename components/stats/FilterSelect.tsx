/** @jsx jsx */
import { ComponentProps } from 'react'
import { jsx, Select} from 'theme-ui'

type Props = ComponentProps<'select'>

const FilterSelect = ({onChange, defaultValue, value}: Props) => {
  return (
    <Select
      defaultValue={defaultValue}
      value={value}
      onChange={onChange}
      sx={{
        maxWidth: '220px',
        backgroundColor: 'background',
        borderColor: '#eaeaea',
        fontWeight: 500,
        color: '#666',
        py: '6px',
        px: '12px',
        '&:hover': {
          borderColor: '#000',
          color: '#000'
        },
      }}
    >
      <option value="best">Nejlepší výsledky</option>
      <option value="first">Výsledky prvních pokusů</option>
      <option value="last">Výsledky posledních pokusů</option>
    </Select>
  )
}

export default FilterSelect