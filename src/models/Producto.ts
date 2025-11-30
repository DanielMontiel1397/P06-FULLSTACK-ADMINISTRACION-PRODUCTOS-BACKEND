import {Table, Column, Model, DataType, Default} from 'sequelize-typescript'

@Table({
    tableName: 'productos'
})

class Producto extends Model {
    @Column({
        type: DataType.STRING(100)
    })
    declare name: string
    
    @Column({
        type: DataType.DECIMAL(10,2)
    })
    declare price: number

    @Default(true)
    @Column({
        type: DataType.BOOLEAN
    })
    declare disponibilidad: boolean
}

export default Producto;
