package pl.SpringBootProjects.BudgetApp.entity;

import jakarta.persistence.*;
import lombok.*;

@NoArgsConstructor
@Getter
@Setter
@ToString
@Entity
@Table(name = "categories")
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "name")
    private String name;

    @Column(name = "type")
    private String type;

    @Column(name = "color")
    private String color;

    @Column(name = "icon_path")
    private String iconPath;

    @Column(name = "is_default")
    private Boolean isDefault = false;

    public Category(String name, String type, String color, String iconPath) {
        this.name = name;
        this.type = type;
        this.color = color;
        this.iconPath = iconPath;
    }

}